/*
 This is an example configuration file.

 COPY OR RENAME THIS FILE TO config.js.

 Make sure you use real IDs from your HA entities.
*/

var CONFIG = {
   customTheme: CUSTOM_THEMES.TRANSPARENT, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.NORMAL, //SMALL, BIG are available
   tileSize: 150,
   tileMargin: 6,
   serverUrl: 'http://' + location.hostname + ':8123',
   wsUrl: 'ws://' + location.hostname + ':8123/api/websocket',
   authToken: null, // optional long-lived token (CAUTION: only if TileBoard is not exposed to the internet)
   debug: false, // Prints entities and state change info to the console.
   pingConnection: true, //ping connection to prevent silent disconnections
   locale: 'en-us', // locale for date and number formats - available locales: it, de, es, fr, pt, ru, nl, pl, en-gb, en-us (default). See readme on adding custom locales.
   // next fields are optional
   events: [],
   timeFormat: 24,
   menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
   hideScrollbar: false, // horizontal scrollbar
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // HORIZONTALLY, VERTICALLY, GRID
   onReady: function () {},

   header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
      styles: {
         margin: '30px 130px 0',
         fontSize: '28px'
      },

      left: [
         {
            type: HEADER_ITEMS.DATETIME,
            dateFormat: 'EEEE, dd LLLL', //https://docs.angularjs.org/api/ng/filter/date
         }
      ],

      right: [
         {
            type: HEADER_ITEMS.WEATHER,
            styles: {
               margin: '0'
            },
            icon: function () {
               let sensor = this.states['weather.husvaetti'];
               return sensor.attributes.forecast[0].condition;
            },
            icons: {
               'clear-day': 'clear',
               'clear-night': 'nt-clear',
               'cloudy': 'cloudy',
               'exceptional': 'unknown',
               'fog': 'fog',
               'hail': 'sleet',
               'lightning': 'chancestorms',
               'lightning-rainy': 'tstorms',
               'partly-cloudy-day': 'partlycloudy',
               'partly-cloudy-night': 'nt-partlycloudy',
               'partlycloudy': 'partlycloudy',
               'pouring': 'rain',
               'sunny': 'sunny',
               'snowy': 'snow',
               'snowy-rainy': 'sleet',
               'wind': 'unknown',
               'windy': 'unknown',
               'windy-variant': 'unknown'
            },
            states: {
               'clear-night': 'Clear, night',
               'cloudy': 'Cloudy',
               'exceptional': 'Exceptional',
               'fog': 'Fog',
               'hail': 'Hail',
               'lightning': 'Lightning',
               'lightning-rainy': 'Lightning, rainy',
               'partlycloudy': 'Partly cloudy',
               'pouring': 'Pouring',
               'rainy': 'Rainy',
               'snowy': 'Snowy',
               'snowy-rainy': 'Snowy, rainy',
               'sunny': 'Sunny',
               'windy': 'Windy',
               'windy-variant': 'Windy'
            },
            fields: {
               temperature: '&weather.husvaetti.attributes.temperature',
               temperatureUnit: '??C',
            }
          }
      ]
   },

   pages: [
      {
         title: 'Heima',
         bg: 'images/bg-nuuk.jpg',
         icon: 'mdi-home-outline', // home icon
         groups: [
            {
               title: 've??ri??',
               width: 4,
               height: 2,
               groupMarginCss: "20px",
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     height: 2,
                     type: TYPES.WEATHER,
                     id: {},
                     state: function () {
                        let sensor = this.states['weather.husvaetti'];
                        return sensor.attributes.forecast[0].condition;
                     },
                     icon: function () {
                        let sensor = this.states['weather.husvaetti'];
                        return sensor.attributes.forecast[0].condition;
                     },
                     icons: {
                        'clear-day': 'clear',
                        'clear-night': 'nt-clear',
                        'cloudy': 'cloudy',
                        'sunny': 'sunny',
                        'rain': 'rain',
                        'sleet': 'sleet',
                        'snow': 'snow',
                        'wind': 'hazy',
                        'fog': 'fog',
                        'partly-cloudy-day': 'partlycloudy',
                        'partly-cloudy-night': 'nt-partlycloudy'
                     },
                     fields: {
                        temperature: '&weather.husvaetti.attributes.temperature',
                        temperatureUnit: ' ??C',
                        windSpeed: '&weather.husvaetti.attributes.wind_speed',
                        windSpeedUnit: ' m/s',
                        humidity: '&weather.husvaetti.attributes.humidity',
                        humidityUnit: ' %',

                     }
                  },
                  {
                     position: [1, 0],
                     type: TYPES.WEATHER_LIST,
                     width: 3,
                     height: 2,
                     title: '5 daga fors??gning',
                     id: {},
                     icons: {
                        'clear-day': 'clear',
                        'clear-night': 'nt-clear',
                        'cloudy': 'cloudy',
                        'rain': 'rain',
                        'sleet': 'sleet',
                        'snow': 'snow',
                        'wind': 'hazy',
                        'fog': 'fog',
                        'partly-cloudy-day': 'partlycloudy',
                        'partly-cloudy-night': 'nt-partlycloudy'
                     },
                     hideHeader: false,
                     primaryTitle: 'Hitastig',
                     secondaryTitle: 'Avfall',
                     state: false,
                     list: [0,1,2,3,4].map(function (id) {
                        return {
                           date: function () {
                              var d = new Date(Date.now() + id * 24 * 60 * 60 * 1000);
                              return d.toString().split(' ').slice(1, 3).join(' ');
                              },
                           icon: function() {
                              var sensor = this.states['weather.husvaetti'];
                              return sensor.attributes.forecast[id].condition;
                           },
                           primary: function() {
                              var sensor = this.states['weather.husvaetti'];
                              var forecast = sensor.attributes.forecast[id].temperature + " / ";
                              forecast += sensor.attributes.forecast[id].templow + " ??C";
                              return forecast;
                           },
                           secondary: function() {
                              var sensor = this.states['weather.husvaetti'];
                              var precipitation = sensor.attributes.forecast[id].precipitation;
                              if (precipitation == null) {
                                 precipitation = "0";
                              }
                              precipitation += " mm";
                              return precipitation;
                           }
                        }
                     })
                  }
               ],
            },
            {
               title: 'klokkan er',
               width: 3,
               height: 2,
               row: 1,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.SENSOR,
                     title: '&sensor.nuuk.attributes.friendly_name',
                     id: 'sensor.nuuk',
                     unit: '', // override default entity unit
                     state: false, // hidding state
                  },
                  {
                     position: [1, 0],
                     type: TYPES.SENSOR,
                     title: '&sensor.sorvagur.attributes.friendly_name',
                     id: 'sensor.sorvagur',
                     unit: '', // override default entity unit
                     state: false, // hidding state
                  },
                  {
                     position: [2, 0],
                     type: TYPES.SENSOR,
                     title: '&sensor.keypmannahavn.attributes.friendly_name',
                     id: 'sensor.keypmannahavn',
                     unit: '', // override default entity unit
                     state: false, // hidding state
                  },

               ]
            }
         ]
      }
   ],

   /*screensaver: {// optional. https://github.com/resoai/TileBoard/wiki/Screensaver-configuration
      timeout: 300, // after 5 mins of inactive
      slidesTimeout: 10, // 10s for one slide
      styles: { fontSize: '40px' },
      leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }], // put datetime to the left-bottom of screensaver
      slides: [
         { bg: 'images/bg1.jpeg' },
         {
            bg: 'images/bg2.png',
            rightTop: [ // put text to the 2nd slide
               {
                  type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                  html: 'Welcome to the <b>TileBoard</b>',
                  styles: { fontSize: '40px' }
               }
            ]
         },
         { bg: 'images/bg3.jpg' }
      ]
   },*/
   /*
   pages: [
      {
         title: 'Main page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-home-outline', // home icon
         groups: [
            {
               title: 'First group',
               width: 2,
               height: 3,
               // row: 0,  // optional; index of the row used for the GRID layout. If not specified, the default is 0
               items: [
                  {
                     position: [0, 0],
                     width: 2,
                     type: TYPES.TEXT_LIST,
                     id: {}, // using empty object for an unknown id
                     state: false, // disable state element
                     list: [
                        {
                           title: 'Sun.sun state',
                           icon: 'mdi-weather-sunny',
                           value: '&sun.sun.state'
                        },
                        {
                           title: 'Custom',
                           icon: 'mdi-clock-outline',
                           value: 'value'
                        }
                     ]
                  },
                  {
                     position: [0, 1], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR,
                     id: 'binary_sensor.updater',
                     state: '@attributes.release_notes' // https://github.com/resoai/TileBoard/wiki/Templates
                  },
                  {
                     title: 'Heating',
                     position: [1, 1],
                     id: { attributes: { current_temperature: 11 } },
                     type: TYPES.CLIMATE,
                     unit: '??C',
                     useHvacMode: true,  // Optional: enables HVAC mode (by default uses PRESET mode)
                     state: function (item, entity) {
                        return 'Actual: ' + this.$scope.filterNumber(entity.attributes.current_temperature, 1) + ' ??C';
                     },
                     states: {
                        'auto': 'Automatic',
                        'heat': 'Manual',
                        'off': 'Off'
                     },
                  },
               ]
            },

            {
               title: 'Second group',
               width: 2,
               height: 3,
               // row: 0,  // optional; index of the row used for the GRID layout. If not specified, the default is 0
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     type: TYPES.SLIDER,
                     //id: "input_number.volume",
                     id: {state: 50, attributes: {}}, // replace it with real string id
                     state: false,
                     title: 'Custom slider',
                     subtitle: 'Example of subtitle',
                     slider: {
                        min: 0,
                        max: 100,
                        step: 2,
                        request: {
                           type: "call_service",
                           domain: "input_number",
                           service: "set_value",
                           field: "value"
                        }
                     }
                  },
                  {
                     position: [1, 0],
                     width: 1,
                     type: TYPES.SWITCH,
                     //id: "switch.lights",
                     id: {state: 'off'}, // replace it with real string id (e.g. "switch.lights")
                     state: false,
                     title: 'Custom switch',
                     icons: {'off': 'mdi-volume-off', 'on': 'mdi-volume-high'}
                  },
                  {
                     position: [0, 1],
                     type: TYPES.ALARM,
                     // id: "alarm_control_panel.home_alarm",
                     id: { state: 'disarmed' }, // replace it with real string id
                     title: 'Home Alarm',
                     icons: {
                        arming: 'mdi-bell-outline',
                        disarmed: 'mdi-bell-off',
                        pending: 'mdi-bell',
                        armed_custom_bypass: 'mdi-bell-check',
                        armed_home: 'mdi-bell-plus',
                        armed_night: 'mdi-bell-sleep',
                        armed_away: 'mdi-bell',
                        triggered: 'mdi-bell-ring',
                     },
                     states: {
                        arming: 'Arming',
                        disarmed: 'Disarmed',
                        pending: 'Pending',
                        armed_custom_bypass: 'Armed custom bypass',
                        armed_home: 'Armed home',
                        armed_night: 'Armed night',
                        armed_away: 'Armed away',
                        triggered: 'Triggered',
                     },
                  },

               ],
            },

            {
               title: 'MyCity',
               width: 1,
               height: 3,
               // row: 1,  // optional; index of the row used for the GRID layout. If not specified, the default is 0
               items: [
                  {
                     // please read README.md for more information
                     // this is just an example
                     position: [0, 0],
                     height: 2, // 1 for compact
                     //classes: ['-compact'],
                     type: TYPES.WEATHER,
                     id: {},
                     state: function () {return 'Clear, night'}, // https://github.com/resoai/TileBoard/wiki/Anonymous-functions
                     icon: 'clear-night',
                     icons: {
                        'clear-day': 'clear',
                        'clear-night': 'nt-clear',
                        'cloudy': 'cloudy',
                        'exceptional': 'unknown',
                        'fog': 'fog',
                        'hail': 'sleet',
                        'lightning': 'chancestorms',
                        'lightning-rainy': 'tstorms',
                        'partly-cloudy-day': 'partlycloudy',
                        'partly-cloudy-night': 'nt-partlycloudy',
                        'pouring': 'rain',
                        'snowy': 'snow',
                        'snowy-rainy': 'sleet',
                        'wind': 'unknown',
                        'windy': 'unknown',
                        'windy-variant': 'unknown'
                     },
                     states: {
                        'clear-night': 'Clear, night',
                        'cloudy': 'Cloudy',
                        'exceptional': 'Exceptional',
                        'fog': 'Fog',
                        'hail': 'Hail',
                        'lightning': 'Lightning',
                        'lightning-rainy': 'Lightning, rainy',
                        'partlycloudy': 'Partly cloudy',
                        'pouring': 'Pouring',
                        'rainy': 'Rainy',
                        'snowy': 'Snowy',
                        'snowy-rainy': 'Snowy, rainy',
                        'sunny': 'Sunny',
                        'windy': 'Windy',
                        'windy-variant': 'Windy'
                     },
                     fields: {
                        temperature: '18',
                        temperatureUnit: '??C',
                        windSpeed: '5',
                        windSpeedUnit: 'kmh',
                        humidity: '50',
                        humidityUnit: '%',
                        pressure: '650',
                        pressureUnit: 'hPa',
                        list: [
                           'Feels like 16 ??C',
                           /*
                           'Cloud coverage '
                              + '&sensor.openweathermap_cloud_coverage.state'
                              + '&sensor.openweathermap_cloud_coverage.attributes.unit_of_measurement',
                           */
/*
                        ]
                     }
                  }

               ]
            }
         ]
      },
      {
         title: 'Second page',
         bg: 'images/bg2.png',
         icon: 'mdi-numeric-2-box-outline',
         groups: [
            {
               title: '',
               width: 4,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 2,
                     title: 'Short instruction',
                     type: TYPES.TEXT_LIST,
                     id: {}, // using empty object for an unknown id
                     state: false, // disable state element
                     list: [
                        {
                           title: 'Read',
                           icon: 'mdi-numeric-1-box-outline',
                           value: 'README.md'
                        },
                        {
                           title: 'Ask on forum',
                           icon: 'mdi-numeric-2-box-outline',
                           value: 'home-assistant.io'
                        },
                        {
                           title: 'Open an issue',
                           icon: 'mdi-numeric-3-box-outline',
                           value: 'github.com'
                        },
                     ]
                  },
                  {
                     position: [2, 0],
                     width: 2,
                     title: 'System Status',
                     type: TYPES.TEXT_LIST,
                     id: {}, // using empty object for an unknown id
                     state: false, // disable state element
                     list: [
                        {
                           title: 'Free Memory',
                           icon: 'mdi-memory',
                           value: function() {
                              // var freeMemory = this.parseFieldValue('&sensor.memory_free.state')
                              var freeMemory = 15.444  // Just an example.
                              return this.$scope.filterNumber(freeMemory, 1) + ' GB';
                           }
                        },
                     ]
                  },
                  {
                     position: [0, 1.5],
                     width: 1.5,
                     height: 1.5,
                     title: 'My Gauge Title',
                     subtitle: '',
                     type: TYPES.GAUGE,
                     // id: 'sensor.my_sample_sensor', // Assign the sensor you want to display on the gauge
                     id: {state: 11111}, // Remove after choosing to actual sensor ID
                     value: function(item, entity) {
                        return entity.state;
                     },
                     settings: {
                        size: 200, // Defaults to 50% of either height or width, whichever is smaller
                        type: 'full', // Options are: 'full', 'semi', and 'arch'. Defaults to 'full'
                        min: 0, // Defaults to 0
                        max: 25000, // Defaults to 100
                        cap: 'round', // Options are: 'round', 'butt'. Defaults to 'butt'
                        thick: 8, // Defaults to 6
                        label: 'My Gauge', // Defaults to undefined
                        append: '@attributes.unit_of_measurement', // Defaults to undefined
                        prepend: '$', // Defaults to undefined
                        duration: 1500, // Defaults to 1500ms
                        thresholds: { 0: { color: 'green'}, 80: { color: 'red' } }, // Defaults to undefined
                        labelOnly: false, // Defaults to false
                        foregroundColor: 'rgba(0, 150, 136, 1)', // Defaults to rgba(0, 150, 136, 1)
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Defaults to rgba(0, 0, 0, 0.1)
                        fractionSize: 0, // Number of decimal places to round the number to. Defaults to current locale formatting
                     },
                  },
               ]
            },
         ]
      }
   ],
   */
}
