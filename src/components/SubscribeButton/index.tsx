import { api } from '../../services/api' 
import { signIn, useSession } from 'next-auth/client';
import styles from './styles.module.scss'
import { getStripeJs } from '../../services/stripe-js';

 

interface SubscribeButtonProps{
    priceId:string;
}

export function SubscribeButton({priceId}:SubscribeButtonProps){
   
    const [session] = useSession()

    async function hendleSubcribeButton(){
        if(!session){
            signIn('github')
            return;
        }
        try{
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId})
            
        }catch(err){
            alert('Erro'+ err.message)
        }

    }

    return(
        <button type="button" className={styles.subscribeButton} onClick={hendleSubcribeButton}>
            Subscribe now        
        </button>
    );
}