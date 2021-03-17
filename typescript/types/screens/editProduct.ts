import {FORM_INPUT_UPDATE } from '../../../screens/user/EditProductScreen'

export type FormState = {
    inputValues: {
      title: string;
      imageUrl: string;
      price: string;
      description: string;
    };
  
    inputValidities: {
      title: boolean;
      imageUrl: boolean;
      price: boolean;
      description: boolean;
    };
    formIsValid: boolean;
  };
  
  export type ActionsReducer = {
    type: typeof FORM_INPUT_UPDATE;
    value: string;
    formIsValid: boolean;
    input: string;
  };