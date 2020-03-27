import React, { useState } from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

export default function Wallet({initialCardNumber, initialCardExpiry, initialCVC, changeFunction}) {

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    const [cardNumber, setCardNumber] = useState(initialCardNumber);
    const [cardExpiry, setCardExpiry]  = useState(initialCardExpiry);
    const [cardCVC, setCardCVC] = useState(initialCVC);

    return (
        <div>
            <div className="bod">
                <PaymentInputsWrapper {...wrapperProps}>
                    <svg {...getCardImageProps({ images })} />
                    <input {...getCardNumberProps({ onChange: changeFunction })} value={cardNumber} />
                    <input {...getExpiryDateProps({ onChange: changeFunction })} value={cardExpiry} />
                    <input {...getCVCProps({ onChange: changeFunction })} value={cardCVC}  />
                </PaymentInputsWrapper>        
            </div>
        </div>
    );
}