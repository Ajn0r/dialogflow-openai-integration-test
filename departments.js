const handleDepartments = async(department, language) => {

    if (language === 'sv') {
        if (department === 'Armén') {
            return 'Armén är en av Försvarsmaktens tre huvudgrenar. Armén har till uppgift att skydda Sverige och stödja samhället vid kriser. Armén har en bred uppgiftsbild och kan användas i många olika typer av insatser.';
        } else if (department === 'Flygvapnet') {
            return 'Flygvapnet är en av Försvarsmaktens tre huvudgrenar. Flygvapnet ansvarar för att upprätthålla luftrumssuveräniteten över Sverige och för att kunna genomföra flyginsatser i hela landet.';
        } else if (department === 'Marinen') {
            return 'Marinen är en av Försvarsmaktens tre huvudgrenar. Marinen ansvarar för att skydda Sveriges kuster och för att kunna genomföra insatser till sjöss.' + ' ' +
                'Vill du veta med om Marinen kan du kika in <här href="https://www.forsvarsmakten.se/sv/var-verksamhet/det-har-gor-forsvarsmakten/marinen">här</a>';
        } else {
            return 'Försvarsmakten har tre huvudgrenar: Armén, Flygvapnet och Marinen. Vilken gren vill du veta mer om?';
        }
    } else if (language === 'en') {

        if (department === 'Armén') {
            return 'The Army is one of the three main branches of the Swedish Armed Forces. The Army is responsible for protecting Sweden and supporting society in times of crisis. The Army has a broad range of tasks and can be used in many different types of operations.';
        } else if (department === 'Flygvapnet') {
            return 'The Air Force is one of the three main branches of the Swedish Armed Forces. The Air Force is responsible for maintaining air space sovereignty over Sweden and for being able to carry out air operations throughout the country.';
        } else if (department === 'Marinen') {
            return 'The Navy is one of the three main branches of the Swedish Armed Forces. The Navy is responsible for protecting Sweden\'s coasts and for being able to carry out operations at sea.' + ' ' +
                'If you want to know more about the Navy, you can check it out <a ref="https://www.forsvarsmakten.se/en/about/organisation/the-navy/" >here</a>';
        }
    } else {
        return 'The armed forces have three main branches: the Army, the Air Force and the Navy. Which branch would you like to know more about?';
    }
};

module.exports = { handleDepartments };