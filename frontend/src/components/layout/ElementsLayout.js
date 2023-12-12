import { Outlet } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useGetStripeApiKeyQuery } from "../../features/order/shippingApiSlice";
import { useState, useEffect } from 'react';
import Payment from '../order/Payment';
import Loader from './loader/Loader';



const ElementsLayout = () => {

    const { data, isLoading, error } = useGetStripeApiKeyQuery();
    const [stripeApiKey, setStripeApiKey] = useState()

    useEffect(() => {
        if (data && data.success) {
            setStripeApiKey(data.data.stripeApiKey)
        }
    },)



    return (
        <>
            {isLoading ?
                <Loader />
                :
                <>
                    {(stripeApiKey) ?
                        <Elements stripe={loadStripe(stripeApiKey)}>
                            < Payment />
                        </Elements >
                        :
                        <></>
                    }
                </>
            }
        </>
    )
}
export default ElementsLayout;