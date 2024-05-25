// import { newOrder } from "@/actions/orders/createOrder";
import { newOrder } from "@/actions/orders/createOrder";
import { getUser } from "@/actions/user/getUser";
import { styles } from "@/utils/styles";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({
  setOpen,
  open,
  promptData,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  promptData: any;
}) => {
  const [message, setMessage] = useState<any>("");
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    country: 'Bangladesh',
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try{
        const userData = await getUser();
        // if (!stripe || !elements) {
        //   return;
        // }
        // const { error, paymentIntent } = await stripe.confirmPayment({
        //   elements,
        //   redirect: "if_required",
        // });
        if (1) {
          await newOrder({
            userId: userData?.user?.id!,
            promptId: promptData.id,
            payment_id:"2",
            payment_method: "visa",
          }
        ).then((res) => {
          console.log(res);
          toast.success("Prompt uploaded successfully");
            setOpen(!open);
            window.location.reload();
          });
        }

    }
    catch(error){
        console.log(error)

    }
    
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button
        id="submit"
        className={`${styles.button} !bg-[crimson] mt-4 !p-2 !w-full`}
      >
        <span>Pay Now ${promptData?.price}</span>
      </button>
      {/* Show amy error or success message */}
      {message && (
        <div id="payment-message" className="text-[red] font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>




  




    

  );
};

export default CheckoutForm;