package grupo8.restapi.app.model.dao.interfaces;

import grupo8.restapi.app.model.entity.edificio.Edificio;
import grupo8.restapi.app.model.entity.unidad.Unidad;

import java.util.List;

public interface IEdificioDAO {
    List<Edificio> getAll();
    Edificio getById(long id);
    void save(Edificio edificio );
    void delete(Edificio edificio);
    void saveWithUnidades(Edificio edificio, List<Unidad> unidades);


}

