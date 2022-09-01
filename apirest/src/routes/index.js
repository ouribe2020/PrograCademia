const {Router} = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        
        "_id": 1,
        "preguntas": [
            {
                "categoria": "Science:Computers",
                "tipo_Pregunta": "multiple",
                "dificultad": "easy",
                "pregunta": "¿Cual de las siguientes es una variable de tipo int?",
                "respuesta_Correcta": "18",
                "respuestas_Incorrectas": [
                    "12.3",
                    "0.004753948",
                    "true"
                ]
            }
        ]
        
        
    };
    res.json(data);
});

module.exports = router;