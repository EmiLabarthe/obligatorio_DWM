# Desarrollo web - Proyecto final
## Tomás Darracq - Alejandro Piccardo - Manuel Mongelós - Emiliano Labarthe

-----

## Pasos a tener en cuenta - del lado del administrador
- En primer lugar, se debe iniciar sesión como admin

| Username | Password |
|------|-------|
| admin | 1234 |

- Una vez iniciado como admin, se pueden seleccionar proposals para ejecutar, crear nuevas, ingresar nuevas actividades, entre otra variedad de funcionalidades.

- Para crear una proposal, basta con ir al botón de + de la pantalla de inicio, seleccionar las actividades a incluir, y tocar en "create proposal"

- Para crear una actividad, se debe clickear en el "create activity" en la parte superior, en la página de crear proposal.

## Al testear la corrida - del lado del administrador
- Cuando demos a "Start proposal", se direccionará al lobby de la propuesta. Aquí nos dará el Session Code, el cual los invitados deberán ingresar en la pantalla de login para entrar a la sesión

- Una vez se de al botón "Start session!", empezará a correr la propuesta con los invitados conectados

## Al testear - del lado del invitado
- ** Es importante entrar desde diferentes browsers o dispositivos cuando entramos como invitados, ya que los votos utilizan funciones de LocalStorage, y tener dos pestañas abiertas hará que se cuenten solo los de una. **