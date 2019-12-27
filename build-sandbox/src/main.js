class App {
    run = (name = 'World') => {
        console.log(`Hello ${name}`);
    }
}

app = new App();
app.run();
