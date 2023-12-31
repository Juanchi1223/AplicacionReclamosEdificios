package grupo8.restapi.app.controllers;

import grupo8.restapi.app.model.dto.usuarios.UsuarioDTO;
import grupo8.restapi.app.model.entity.usuarios.Usuario;
import grupo8.restapi.app.service.intefaces.IUsuarioService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {
    private final int EXPIRATION_TIME_IN_MIN = 60;
    private final IUsuarioService usuarioService;
    private final SecretKey secretKey;

    public AuthController(IUsuarioService usuarioService, SecretKey secretKey) {
        this.usuarioService = usuarioService;
        this.secretKey = secretKey;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioDTO usuarioDTO){
        Usuario usuario = usuarioService.findUser(usuarioDTO.getNombreUs(), usuarioDTO.getContraseña());

        if(usuario != null) {
            String token = Jwts.builder().setSubject(usuarioDTO.getNombreUs()).setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MIN * 60 * 1000))
                    .claim("rol", usuarioService.darRol(usuario))
                    .signWith(secretKey, SignatureAlgorithm.HS256).compact();
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Credenciales invalidas", HttpStatus.UNAUTHORIZED);
        }
    }
}
