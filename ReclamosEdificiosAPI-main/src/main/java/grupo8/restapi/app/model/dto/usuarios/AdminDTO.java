package grupo8.restapi.app.model.dto.usuarios;

public class AdminDTO {
    private Long idAdmin;
    private String nombre;
    private String nombreUs;
    private int telefono;
    private String email;
    private String direcion;

    public AdminDTO() {

    }

    public AdminDTO(Long idAdmin,String nombre, String nombreUs, int telefono, String email, String direcion) {
        this.idAdmin = idAdmin;
        this.nombre = nombre;
        this.nombreUs = nombreUs;
        this.telefono = telefono;
        this.email = email;
        this.direcion = direcion;
    }

    public String getNombre() {
        return nombre;
    }

    public String getNombreUs() {
        return nombreUs;
    }

    public int getTelefono() {
        return telefono;
    }

    public String getEmail() {
        return email;
    }

    public String getDirecion() {
        return direcion;
    }

    public Long getIdAdmin() {
        return idAdmin;
    }

    public void setIdAdmin(Long idAdmin) {
        this.idAdmin = idAdmin;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setNombreUs(String nombreUs) {
        this.nombreUs = nombreUs;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDirecion(String direcion) {
        this.direcion = direcion;
    }
}
