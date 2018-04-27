export class AppConfiguration {
  public menubar = {
    menus:
      [
        {
          menuNombre: 'administracion', link: 'administracion',
          subMenus:
            [
              { nombre: 'ept', link: 'evaluaciontramite' },
              { nombre: 'lnc', link: 'listanegraclientes' },
              { nombre: 'lidc', link: 'limitedecredito' },
              { nombre: 'laut', link: 'lineasautorizadas' },
              { nombre: 'depgpl', link: 'depositoengarantialibre' },
              { nombre: 'depgpf', link: 'depogarantiaforzo' },
              { nombre: 'plib', link: 'planeslibres' },
              { nombre: 'req', link: 'rangodeequipo' },
              { nombre: 'score', link: 'score' }
            ]
        },
        {
          menuNombre: 'reportes', link: 'reportes',
          subMenus:
            [
            ]
        },
        {
          menuNombre: 'catalogos', link: 'catalogos',
          subMenus:
            [
            ]
        },
        {
          menuNombre: 'seguridad', link: 'seguridad',
          subMenus:
            [
            ]
        }
      ]
  };

  constructor() {
  }
}
