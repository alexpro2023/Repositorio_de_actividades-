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
            WELCOME_MESSAGE: 'Welcome to currency conversion, what type of currency do you want to convert?',
            HELP_MESSAGE: 'This skill allows you to convert 3 different currencies, pesos, dollars and euros',
            GOODBYE_MESSAGE: 'See you later, I hope I have been of help with this conversion',
            REFLECTOR_MESSAGE: 'You just triggered %s',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again.'
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Bienvenido al conversion de divisas, que tipo de moneda  quieres transformar?',
            
            PESOSDOLAR_MX: 'Pesos a dolares',
            DOLARPESOS_MX: 'Dolares a pesos',
            EUROPESOS_MX: 'Euros a pesos',
            PESOSEUROS_MX: 'Pesos a euros',
            DOLAREUROS_MX: 'Dolar a euros',
            EUROSDOLAR_MX: 'Euros a dolar',
            
            HELP_MESSAGE: 'Esta skill te permite convertir 3 monedas diferentes, pesos, dólares y euros',
            GOODBYE_MESSAGE: 'Hasta luego, espero haya sido de ayuda con esta conversion',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: 'Lo siento, No entendi lo que dijiste. Por favor inténtalo otra vez.',
            ERROR_MESSAGE: 'Lo siento, ha ocurrido un problema. Por favor inténtalo otra vez.'
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
    }
};

const Convertir_pesos_a_dolar_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomConversorIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('PESOSDOLAR_MX');
        const cantPesosDolar = handlerInput.requestEnvelope.request.intent.slots.cantPesosDolar.value;
        
        if(cantPesosDolar >= 1){
            const valor = 17.50;
            const resultado = (cantPesosDolar / valor).toFixed(2);
            
            if(speechText === "Pesos a dolares"){
                const speakOutput = 'la conversion ' + cantPesosDolar + ' pesos equivale a ' + resultado + ' en dolares';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'the conversion ' + cantPesosDolar + ' pesos equals to ' + resultado + ' in dollars';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
        }
        else{
            if(speechText === "Pesos a dolares"){
                const speakOutput = 'Ingresa solo numeros positivos, prueba a poner, "convierte 200 pesos a dolares"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'Enter only positive numbers, try putting, "transform 200 pesos to dollars"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            
        }
    }
}

const Convertir_dolar_a_pesos_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntentDolarPesos';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('DOLARPESOS_MX');
        
        const cantDolarPesos = handlerInput.requestEnvelope.request.intent.slots.cantDolarPesos.value;
        if(cantDolarPesos >= 1){
            const valor = 17.50;
            const resultado = (cantDolarPesos * valor).toFixed(2);
            if(speechText === "Dolares a pesos"){
                const speakOutput = 'la conversion de ' + cantDolarPesos + ' dolares equivale a ' + resultado + ' en pesos';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'the conversion ' + cantDolarPesos + ' dollars equals to ' + resultado + ' in pesos';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            
        }
        else{
            if(speechText === "Dolares a pesos"){
                const speakOutput = 'Ingresa solo numeros positivos, prueba a poner, "convierte 20 dolares a pesos"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'Enter only positive numbers, try putting, "transform 20 dollars to pesos"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            
            
        }
    }
}

const Convertir_euro_a_pesos_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntentEuroPesos';
    },
    handle(handlerInput){
        const cantEuroPesos = handlerInput.requestEnvelope.request.intent.slots.cantEuroPesos.value;
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
	    const speechText = requestAttributes.t('EUROPESOS_MX');
	    
        if(cantEuroPesos >= 1){
            const valor = 19.08;
            const resultado = (cantEuroPesos * valor).toFixed(2);
            
            if(speechText === "Euros a pesos"){
                const speakOutput = 'La conversion de ' + cantEuroPesos + ' euros equivale a ' + resultado + ' en pesos';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'the conversion ' + cantEuroPesos + ' euros equals to ' + resultado + ' to pesos';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
        }
        else{
            
            if(speechText === "Euros a pesos"){
                const speakOutput = 'Ingresa solo numeros positivos, prueba a poner, "convierte 20 euros a pesos"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'Enter only positive numbers, try putting, "transform 20 euros to pesos"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
        }
    }
}

const Convertir_pesos_a_euros_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntentPesosEuro';
    },
    handle(handlerInput){
        const cantPesosEuro = handlerInput.requestEnvelope.request.intent.slots.cantPesosEuro.value;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
		const speechText = requestAttributes.t('PESOSEUROS_MX');
        if(cantPesosEuro >= 1){
            const valor = 19.08;
            const resultado = (cantPesosEuro / valor).toFixed(2);
            
            if(speechText === "Pesos a euros"){
                const speakOutput = 'La conversion de ' + cantPesosEuro + ' pesos equivale a ' + resultado + ' en euros';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'the conversion ' + cantPesosEuro + ' pesos equals to ' + resultado + ' in euros';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            
            
        }
        else{
            
            if(speechText === "Pesos a euros"){
                const speakOutput = 'Ingresa solo numeros positivos, prueba a poner, "convierte 600 pesos a euros"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'Enter only positive numbers, try putting, "transform 600 pesos to euros"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            
            
        }
    }
}

const Convertir_dolar_a_euros_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntentDolarEuro';
    },
    handle(handlerInput){
        const cantDolarEuro = handlerInput.requestEnvelope.request.intent.slots.cantDolarEuro.value;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
		const speechText = requestAttributes.t('DOLAREUROS_MX');
        if(cantDolarEuro >= 1){
            const valor = 0.92;
            const resultado = (cantDolarEuro * valor).toFixed(2);
            
            if(speechText === "Dolar a euros"){
                const speakOutput = 'La conversion de ' + cantDolarEuro + ' dolares equivale a ' + resultado + ' en euros';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'the conversion ' + cantDolarEuro + ' dollars equals to ' + resultado + ' in euros';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            
            
        }
        else{
            if(speechText === "Dolar a euros"){
                const speakOutput = 'Ingresa solo numeros positivos, prueba a poner, "convierte 100 dolares a euros"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'Enter only positive numbers, try putting, "transform 100 dollars to euros"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
        }
    }
}

const Convertir_euro_a_dolares_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntentEuroDolar';
    },
    handle(handlerInput){
        const cantEuroDolar = handlerInput.requestEnvelope.request.intent.slots.cantEuroDolar.value;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
		const speechText = requestAttributes.t('EUROSDOLAR_MX');
		
        if(cantEuroDolar >= 1){
            const valor = 0.92;
            const resultado = (cantEuroDolar / valor).toFixed(2);
            
            if(speechText === "Euros a dolar"){
                const speakOutput = 'La conversion de ' + cantEuroDolar + ' euros equivale a ' + resultado + ' en dolares';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'the conversion ' + cantEuroDolar + ' euros equals to ' + resultado + ' in dollars';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
        }
        else{
            if(speechText === "Euros a dolar"){
                const speakOutput = 'Ingresa solo numeros positivos, prueba a poner, "convierte 80 euros a dolares"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
            else{
                const speakOutput = 'Enter only positive numbers, try putting, "transform 80 euros to dollars"'
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt(speakOutput)
                    .getResponse();
            }
        }
    }
}

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
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
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
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('ERROR_MESSAGE');


        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
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
        Convertir_pesos_a_dolar_Handler,
        Convertir_dolar_a_pesos_Handler,
        Convertir_euro_a_pesos_Handler,
        Convertir_pesos_a_euros_Handler,
        Convertir_dolar_a_euros_Handler,
        Convertir_euro_a_dolares_Handler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor,LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();