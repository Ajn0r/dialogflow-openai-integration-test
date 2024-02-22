exports.handleDepartments = async(department, language) => {

    if (language === 'sv') {
        if (department === 'Armén') {
            return 'Armén är en av Försvarsmaktens tre huvudgrenar. Armén har till uppgift att skydda Sverige och stödja samhället vid kriser. Armén har en bred uppgiftsbild och kan användas i många olika typer av insatser.';
        } else if (department === 'Flygvapnet') {
            return 'Flygvapnet är en av Försvarsmaktens tre huvudgrenar. Flygvapnet ansvarar för att upprätthålla luftrumssuveräniteten över Sverige och för att kunna genomföra flyginsatser i hela landet.';
        } else if (department === 'Marinen') {
            return 'Marinen är en av Försvarsmaktens tre huvudgrenar. Marinen ansvarar för att skydda Sveriges kuster och för att kunna genomföra insatser till sjöss.';
        } else {
            return `Jag förstår inte frågan. Ställ en annan fråga eller kontakta Försvarsmakten via telefon: 08 - 788 75 00 eller e-post:  exp-hkv@mil.se.`;
        }
    } else if (language === 'en') {

        if (department === 'Armén') {
            return 'The Army is one of the three main branches of the Swedish Armed Forces. The Army is responsible for protecting Sweden and supporting society in times of crisis. The Army has a broad range of tasks and can be used in many different types of operations.';
        } else if (department === 'Flygvapnet') {
            return 'The Air Force is one of the three main branches of the Swedish Armed Forces. The Air Force is responsible for maintaining air space sovereignty over Sweden and for being able to carry out air operations throughout the country.';
        } else if (department === 'Marinen') {
            return 'The Navy is one of the three main branches of the Swedish Armed Forces. The Navy is responsible for protecting Sweden\'s coasts and for being able to carry out operations at sea.';
        }
    } else {
        return `I don't understand the question. Ask another question or contact the Swedish Armed Forces via phone: 08 - 788 75 00 or e-mail:  exp-hkv@mil.se.`;
    }
};