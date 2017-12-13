/*! main.js */

function $ (selector, context) {
  return (context || document).querySelector(selector)
}

$.all = function (selector, context) {
  return Array.prototype.slice.call(
    (context || document).querySelectorAll(selector)
  )
}

let main = {
  $cell: true,
  id: 'main',
  $components: [
    {
      $type: 'h2',
      $text: 'Colores',
      class: 'container'
    }, {
    $type: 'div',
    id: 'colores',
    class: 'container',
    $components: [{
      $type: 'span', class: 'color rojo', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'rojo')}}, {
      $type: 'span', class: 'color amarillo', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'amarillo')}}, {
      $type: 'span', class: 'color naranja', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'naranja')}}, {
      $type: 'span', class: 'color verde', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'verde')}}, {
      $type: 'span', class: 'color azul', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'azul')}}, {
      $type: 'span', class: 'color blanco', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'blanco')}}, {
      $type: 'span', class: 'color negro', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'negro')}}, {
      $type: 'span', class: 'color all', onclick: function (e) {$("#colores")._colorAction(this, 'activo', 'all')}
    }],
    _colores: [],
    _otrosColores: false,
    _colorAction: function(el,className, valor) {
      var classes = el.className.split(' ')
      var existingIndex = classes.indexOf(className)
      var existingValor = this._colores.indexOf(valor)
      this._otrosColores = false
      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1)
      }
      else {
        classes.push(className)
        if (valor === 'all') this._otrosColores = true
      }

      if (existingValor >= 0)
        this._colores.splice(existingValor, 1)
      else
        if (valor !== 'all') this._colores.push(valor)

      el.className = classes.join(' ')
      $('#banderas')._update()
    }
  }, {
    $type: 'h2',
    $text: 'Banderas con los colores: ',
    class: 'container',
    $components: [{
      $type: 'strong',
      id: 'contador'
    }]
  }, {
    $type: 'div',
    id: 'banderas',
    class: 'container',
    $init: function() {
      this.$components = flagsData.map(this._template)
    },
    _update: function () {
      let banderasVisibles = []
      flagsData.map(function(x) {
        let verBandera = false
        if ($('#colores')._otrosColores) {
          let coloresBandera = x.colores.split(' ')
          let coloresActivos = $('#colores')._colores
          verBandera = true
          if (coloresActivos.length > 0) {
            for (var i = 0; i < coloresActivos.length; i++) {
              if (coloresBandera.indexOf(coloresActivos[i]) === -1) {
                verBandera = false
              }
            }
          } else {
            verBandera = true
          }
        } else {
          let coloresBandera = x.colores.split(' ').sort().join(' ')
          let coloresActivos = $('#colores')._colores.sort().join(' ')
          if ($('#colores')._colores.length === 0 || coloresActivos === coloresBandera) {
            verBandera = true
          }
        }
        if (verBandera) banderasVisibles.push(x)
      })
      this.$components = banderasVisibles.map(this._template)
      $('#contador').$text = 'Banderas con los colores: ' + banderasVisibles.length
    },
    _template: function (item) {
      return {
        $type: 'div',
        class: 'caja_bandera',
        $components: [{
          $type: 'img',
          class: 'color ' + item.colores,
          src: 'img/banderas/' + item.nombre + '.png',
          alt: item.nombre.replace('-', ' ',),
          title: item.nombre.replace('-', ' ',)
        }, {
          $type: 'p',
          $text: item.nombre.replace('-', ' ',)
        }]
      }
    }
  }],
}
