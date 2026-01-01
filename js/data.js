/**
 * DATOS DE LA WEB DE RECURSOS
 * ============================
 * 
 * Aquí se definen todos los cursos, asignaturas y recursos.
 * Para añadir nuevo contenido, solo hay que modificar este archivo.
 */

const DATOS = {
    cursos: {
        "1eso": {
            nombre: "1º ESO",
            asignaturas: {
                "tecnologia": {
                    nombre: "Tecnología y Digitalización",
                    recursos: {
                        presentaciones: [
                            {
                                titulo: "Tema 1: Introducción a la Tecnología",
                                archivo: "#",
                                tipo: "PDF",
                                fecha: "2024-09-10"
                            },
                            {
                                titulo: "Tema 2: Los Materiales",
                                archivo: "#",
                                tipo: "PPTX",
                                fecha: "2024-10-05"
                            }
                        ],
                        apuntes: [
                            {
                                titulo: "Resumen Tema 1 - Conceptos básicos",
                                archivo: "#",
                                tipo: "PDF",
                                fecha: "2024-09-15"
                            }
                        ],
                        actividades: [
                            {
                                titulo: "Práctica 1: Análisis de objetos tecnológicos",
                                archivo: "#",
                                tipo: "DOCX",
                                fecha: "2024-09-20"
                            },
                            {
                                titulo: "Práctica 2: Propiedades de los materiales",
                                archivo: "#",
                                tipo: "PDF",
                                fecha: "2024-10-12"
                            }
                        ],
                        examenes: []
                    }
                }
            }
        },
        "2eso": {
            nombre: "2º ESO",
            asignaturas: {
                "tecnologia": {
                    nombre: "Tecnología y Digitalización",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                }
            }
        },
        "3eso": {
            nombre: "3º ESO",
            asignaturas: {
                "tecnologia": {
                    nombre: "Educación Digital",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                }
            }
        },
        "4eso": {
            nombre: "4º ESO",
            asignaturas: {
                "tecnologia": {
                    nombre: "Tecnología",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                },
                "digitalizacion": {
                    nombre: "Digitalización",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                }
            }
        },
        "bach1": {
            nombre: "1º Bachillerato",
            asignaturas: {
                "tic1": {
                    nombre: "TIC I",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                },
                "tecnología_e_ingeniería_i": {
                    nombre: "Tecnología_e_ingeniería_I",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                }
            }
        },
        "bach2": {
            nombre: "2º Bachillerato",
            asignaturas: {
                "tic2": {
                    nombre: "TIC II",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                },
                "tecnología_e_ingeniería_ii": {
                    nombre: "Tecnología_e_ingeniería_II",
                    recursos: {
                        presentaciones: [],
                        apuntes: [],
                        actividades: [],
                        examenes: []
                    }
                }
            }
        }
    }
};

/**
 * ICONOS POR TIPO DE ARCHIVO
 */
const ICONOS_ARCHIVO = {
    'PDF': '📕',
    'PPTX': '📊',
    'PPT': '📊',
    'DOCX': '📘',
    'DOC': '📘',
    'XLSX': '📗',
    'XLS': '📗',
    'ZIP': '📦',
    'RAR': '📦',
    'HTML': '🌐',
    'default': '📄'
};

/**
 * NOMBRES LEGIBLES PARA LOS TIPOS DE RECURSO
 */
const NOMBRES_TIPO = {
    'presentaciones': 'Presentaciones',
    'apuntes': 'Apuntes',
    'actividades': 'Actividades',
    'examenes': 'Exámenes'
};

/**
 * Obtiene el icono correspondiente a un tipo de archivo
 */
function getIconoArchivo(tipo) {
    return ICONOS_ARCHIVO[tipo?.toUpperCase()] || ICONOS_ARCHIVO.default;
}

/**
 * Formatea una fecha de YYYY-MM-DD a formato legible
 */
function formatearFecha(fecha) {
    if (!fecha) return '';
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}
