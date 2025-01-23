import {
  EMAIL_FAIL,
  EMAIL_REQ,
  EMAIL_SUCCESS,
  OTP_FAIL,
  OTP_REQ,
  OTP_SUCCESS,
  REG_FAIL,
  REG_REQ,
  REG_SUCCESS,
  CLEAR_ERROR,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  ADMIN_USERS_REQ,
  ADMIN_USERS_SUCESS,
  ADMIN_USERS_FAIL
} from "../constant/UserConstant";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_REQ:
    case OTP_REQ:
      return {
        loading: true,
        success: false,
        err: false,
        ...state,
      };

    case EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        isEmail: action.payload,
        ...state,
      };

    case OTP_SUCCESS:
      return {
        loading: false,
        success: true,
        isOtp: action.payload,
        err: false,
        ...state,
      };

    case EMAIL_FAIL:
    case OTP_FAIL:
      return {
        laoding: false,
        success: false,
        error: action.payload,
        err: true,
        ...state,
      };

    default:
      return state;
  }
};


export const RegisterReducer = (state = { user: {} }, action) => {
  switch (action.type) {
   case REG_REQ:
      case LOAD_USER_REQ :
      return {
        isAuthenticated: false,
        loading: true,
       
      };

    
    case REG_SUCCESS:
        case LOAD_USER_SUCCESS:
  
      return {
        loading: false,
        user: action.payload,
        ...state,
        isAuthenticated: true,
      
      };


    case REG_FAIL:
        case LOAD_USER_FAIL:
       return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case  ADMIN_USERS_REQ:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USERS_SUCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case  ADMIN_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};