/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts={
    "javascript":[
        "Es un lenguaje de programación interpretado y orientado a objetos utilizado principalmente en el desarrollo web.",
        "Es el lenguaje de programación principal utilizado en los navegadores web para agregar interactividad a las páginas web.",
        "Es compatible con una gran cantidad de bibliotecas y frameworks que facilitan el desarrollo de aplicaciones web."],
    "python":[
        "Es un lenguaje de programación interpretado, lo que significa que no se compila antes de ser ejecutado.",
        "Es fácil de aprender y leer debido a su sintaxis simple y clara",
        "Es utilizado en una amplia variedad de aplicaciones, desde ciencia de datos y aprendizaje automático hasta automatización de tareas y desarrollo web."],
    "java":[
        "Es un lenguaje de programación orientado a objetos, lo que significa que todo en Java es un objeto.",
        "Es muy utilizado en el desarrollo de aplicaciones empresariales debido a su capacidad para manejar grandes cantidades de datos.",
        "Es un lenguaje compilado, lo que significa que el código fuente se compila a bytecode y se ejecuta en una máquina virtual Java (JVM)."],
    "php":[
        "Es un lenguaje de programación de código abierto ampliamente utilizado en el desarrollo web.",
        "Fue diseñado específicamente para el desarrollo de aplicaciones web y se ejecuta del lado del servidor.",
        "Es fácil de integrar con HTML y CSS y es compatible con una amplia variedad de bases de datos."],
    "swift":[
        "Es un lenguaje de programación desarrollado por Apple para el desarrollo de aplicaciones iOS, macOS, watchOS y tvOS.",
        "Es un lenguaje de programación seguro que utiliza inferencia de tipos para garantizar que el código esté libre de errores.",
        "Es un lenguaje de programación moderno que utiliza características como extensiones, protocolos y opciones para reducir la complejidad del código."]    
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, puedo darte datos curiosos de algun lenjuage de progrmacion, solo tienes que mecionarlo, por ejemplo, prueba diciendo "que tal JavaScript o menciona otro lenguaje"'; 
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CustomLanguageIntentHandler ={
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) ===  'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomLanguageIntent';
    },
    handle(handlerInput){
        const{language}= handlerInput.requestEnvelope.request.intent.slots;
        let response;
        if(language && languageFacts [language.value]){
            response = languageFacts [language.value][Math.floor(Math.random()* languageFacts[language.value].length)];
        }else{
            response="No tengo informacion sobre el lenguaje que has mencionado,prueba con otro";
        }
        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .getResponse();
    }
    
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'puedo darte datos curiosos de algun lenjuage de progrmacion, solo tienes que mecionarlo, por ejemplo, prueba diciendo "JavaScript o entre otras';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = 'Que las buenas practicas te acompañen y que tengas buen código!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
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
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CustomLanguageIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();