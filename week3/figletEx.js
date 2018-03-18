var figlet = require('figlet');
figlet.fonts(function(err, fonts) {
    if (err) {
        console.log('something went wrong...');
        console.dir(err);
        return;
    }
    //console.dir(fonts.length);
    var leg = fonts.length;//287
    figlet('Hello World!', fonts[100], function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }

    console.log(data);

    figlet.text('Again, Hello World!', 'Graffiti', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }

        console.log(data);

        figlet.text('Last time...', {
            font: 'Standard',
            horizontalLayout: 'full',
            verticalLayout: 'full'
        }, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data);
        });

    });

    });
});
// figlet('Hello World!', 'Standard', function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }

//     console.log(data);

//     figlet.text('Again, Hello World!', 'Graffiti', function(err, data) {
//         if (err) {
//             console.log('Something went wrong...');
//             console.dir(err);
//             return;
//         }

//         console.log(data);

//         figlet.text('Last time...', {
//             font: 'Standard',
//             horizontalLayout: 'full',
//             verticalLayout: 'full'
//         }, function(err, data) {
//             if (err) {
//                 console.log('Something went wrong...');
//                 console.dir(err);
//                 return;
//             }
//             console.log(data);
//         });

//     });

// });