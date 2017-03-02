let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session')
//Moteur de template
app.set('view engine', 'ejs');

//Middleware
app.use('/assets',express.static('public'));
app.use(session({
  secret: 'aasaser',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
//Routes
app.get('/',(request,response)=>{
	/*if(request.session.error){
		response.locals.error = request.session.error
		request.session.error = undefined
	}*/
	let Message = require('./models/message')
	Message.all(function(messages){
		response.render('pages/index',{message: messages})
	
	})
	//console.log(request.session)
	//response.render('pages/index');
});

app.post('/', (request,response)=>{

	if(request.body.message === undefined || request.body.message === ''){
		//request.session.error = "il y a une erreur"
		request.flash('error',"vous n'avez pas pose des messages")
		response.redirect('/');
		}else{
			let Message = require('./models/message')
			Message.create(request.body.message, function(){
			
				request.flash('success', "Merci !");
				response.redirect('/');
			})
		}
	

})
app.listen(8080);