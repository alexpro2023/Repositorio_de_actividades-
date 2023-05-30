/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
  en: {
    translation: {
      WELCOME_MESSAGE: 'Welcome to the calculator!',
      
      SUMA_TRAD: 'The result of the sum is',
      SUMAERROR_TRAD: 'Sorry, I couldnt recognize the operation. Please try again.',
      
      
      RESTA_TRAD:'The result of the subtraction is ',
      RESTAERROR_TRAD:'It is not possible to subtract with negative numbers',
      
      
      DIVIDIR_TRAD:'The result of the division is',
      DIVIDIRERROR_TRAD:'It is not possible to divide by zero. Please provide a non-zero divisor.',
      
      MULTIPLICAR_TRAD:'The result of the multiplication is ',
      MULTIPLICARERROR_TRAD:'It is not possible to multiply by zero. Please provide non-zero numbers.',
      
      HELP_MESSAGE: 'You can say hello to me! How can I help?',
      GOODBYE_MESSAGE: 'Goodbye!',
      REFLECTOR_MESSAGE: 'You just triggered %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again.'
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: '¡Bienvenido a la calculadora!',
      
      SUMA_TRAD: 'El resultado de la suma es ',
      SUMAERROR_TRAD: 'Lo siento, no pude reconocer la operación. Por favor, intenta nuevamente.',
      
      RESTA_TRAD:'El resultado de la resta es ',
      RESTAERROR_TRAD:'No es posible restar con numeros negativos',
      
      DIVIDIR_TRAD:'El resultado de la división es',
      DIVIDIRERROR_TRAD:'No es posible dividir por cero. Por favor, proporciona un divisor diferente de cero.',
      
      MULTIPLICAR_TRAD:'El resultado de la multiplicación es ',
      MULTIPLICARERROR_TRAD:'No es posible multiplicar por cero. Por favor, proporciona números diferentes de cero.',
      
      
      HELP_MESSAGE: 'Puedes decirme hola. Cómo te puedo ayudar?',
      GOODBYE_MESSAGE: 'Adiós!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.'
    }
  }
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechText = requestAttributes.t('WELCOME_MESSAGE');
        
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
  },
};

const calcularManejador = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'calcular';
    },
    handle(handlerInput) {
        var operacion = handlerInput.requestEnvelope.request.intent.slots.operacion.value; 
        var primer_numero = Number(handlerInput.requestEnvelope.request.intent.slots.primer_numero.value);
        var segundo_numero = Number(handlerInput.requestEnvelope.request.intent.slots.segundo_numero.value);
        var resultado=0;
        var speakOutput = '';

        if (operacion === 'multiplicar' || operacion === 'multiply' ) {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechText = requestAttributes.t('MULTIPLICAR_TRAD');
            if (primer_numero !== 0 && segundo_numero !== 0) {
               resultado = primer_numero * segundo_numero;
               speakOutput = speechText + ' ' + resultado;  
            } else {
              const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
              const speechText = requestAttributes.t('MULTIPLICAR_TRAD');
              speakOutput = speechText;
            }
        } else if (operacion === 'dividir'|| operacion==='split' ) {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechText = requestAttributes.t('DIVIDIR_TRAD');
            if (segundo_numero !== 0) {
               resultado = primer_numero / segundo_numero;
               speakOutput = speechText + ' ' + resultado;  
        } else {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechText = requestAttributes.t('DIVIDIRERROR_TRAD');
            speakOutput = speechText;
        }
        } else if (operacion === 'restar'|| operacion==='subtract') {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechText = requestAttributes.t('RESTA_TRAD');
            if (primer_numero > 0 && segundo_numero > 0){
               resultado = primer_numero - segundo_numero;
               speakOutput = speechText + ' ' + resultado;    
        }else{
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechText = requestAttributes.t('RESTAERROR_TRAD');
            speakOutput = speechText;
        } 
        } else if (operacion === 'sumar'|| operacion==='Add') {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechText = requestAttributes.t('SUMA_TRAD');
            resultado = primer_numero + segundo_numero;
            speakOutput = speechText + ' ' + resultado;
        } else {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechText = requestAttributes.t('SUMAERROR_TRAD');
            speakOutput = speechText;
        }

        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }

};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('GOODBYE_MESSAGE');
      
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('REFLECTOR_MESSAGE', intentName);

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('ERROR_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        calcularManejador,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();