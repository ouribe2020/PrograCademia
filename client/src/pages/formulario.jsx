import React from "react"

const Formulario = () => {
    return (
        <center>
            <div>
                <form method="POST" action="/new-entry">
                    <div>
                        <label for="title">Categoria</label>
                        <input type="text" class="form-control" name="categoria" placeholder="Categoria"
                            autofocus required>
                    </div>
                    <div class="form-group">
                        <label for="title">Tipo de Pregunta</label>
                        <input type="text" class="form-control" name="tipo_Pregunta" id="tipo_Pregunta"
                            placeholder="Tipo de Pregunta" required>
                    </div>
                    <div class="form-group">
                        <label for="title">Dificultad</label>
                        <input type="text" class="form-control" name="dificultad" id="dificultad"
                            placeholder="Dificultad" required>
                    </div>
                    <div class="form-group">
                        <label for="title">Pregunta</label>
                        <textarea name="titulo" id="titulo" rows="2" class="form-control" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="title">Alternativa</label>
                        <input type="text" class="form-control" name="a" id="a" placeholder="Alternativa A" required>
                        <input type="text" class="form-control" name="b" id="b" placeholder="Alternativa B" required>
                        <input type="text" class="form-control" name="c" id="c" placeholder="Alternativa C" required>
                        <input type="text" class="form-control" name="d" id="d" placeholder="Alternativa D" required>
                    </div>
                    <div class="form-group">
                        A:
                        <select name="a2" id="a2">
                            <option>False</option>
                            <option>True</option>
                        </select>
                        B:
                        <select name="b2" id="b2">
                            <option>False</option>
                            <option>True</option>
                        </select>
                        C:
                        <select name="c2" id="c2">
                            <option>False</option>
                            <option>True</option>
                        </select>
                        D:
                        <select name="d2" id="d2">
                            <option>False</option>
                            <option>True</option>
                        </select>
                    </div>
                    <input type="submit" value="Save Json" class="btn btn-primary">
                </form>
            </div>
        </center>     
    );
};

export default Formulario;