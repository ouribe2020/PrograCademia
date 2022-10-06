import preguntas from "./preguntas";
import React, { useState, useEffect } from "react";


export default function Quiz() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  const makeAPICall = async () => {
    try {
      const response = await fetch('https://restapi-progracademia.herokuapp.com/api/preguntas', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])

  /*const cargaPregunta = async() =>{
    const respuesta = await fetch("https://restapi-progracademia.herokuapp.com/api/preguntas");
    console.log(respuesta);
  }
  cargaPregunta();*/


  function handleAnswerSubmit(isCorrect, e){
    // añadir puntuación
    if (isCorrect) setPuntuación(puntuación + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta
    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1){
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
      }
    }, 500);
    
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if(tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if(tiempoRestante === 0) setAreDisabled(true);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            Obtuviste {puntuación} de {preguntas.length}
          </span>
          <button 
          onClick={() => (window.location.href = "/")}>
            Volver a jugar
          </button>
          <button onClick={() => {
            setIsFinished(false);
            setAnswersShown(true);
            setPreguntaActual(0);
          }}>
            Ver Respuestas
          </button>
        </div>
      </main>
    );

  if(answersShown) return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
        <span> Pregunta {preguntaActual + 1} de </span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
        {preguntas[preguntaActual].titulo}
        </div>
        <div>
          {
            preguntas[preguntaActual].opciones.filter(
              (opcion) => opcion.isCorrect
            )[0].textoRespuesta
          }
        </div>
        <button
          onClick={() => {
            if(preguntaActual === preguntas.length - 1){
              window.location.href = "/";
            }else{
              setPreguntaActual(preguntaActual + 1);
            }
          }}
        >
          {preguntaActual === preguntas.length - 1 ? "Volver a jugar" : "Siguiente"}
        </button>
      </div>
    </main>);


  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
        <span> Pregunta {preguntaActual + 1} de </span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
        {preguntas[preguntaActual].titulo}
        </div>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Tiempo Restante: {tiempoRestante}
            </span>
          ) : (
            <button onClick={()=>{
              setTiempoRestante(10);
              setAreDisabled(false);
              setPreguntaActual(preguntaActual + 1);
            }}>
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
        {preguntas[preguntaActual].opciones.map((respuesta) => (
          <button
          disabled={areDisabled}
          key={respuesta.textoRespuesta} 
          onClick={ (e) => handleAnswerSubmit(respuesta.isCorrect, e) } > 
            {respuesta.textoRespuesta} 
          </button>
        ))}
      </div>
    </main>
  )
}


