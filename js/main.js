/**
 * LÓGICA PRINCIPAL DE LA WEB
 * ==========================
 */

// Estado de la navegación
const estado = {
    cursoActual: null,
    asignaturaActual: null,
    tipoActual: null
};

// Referencias a elementos del DOM
const elementos = {
    views: document.querySelectorAll('.view'),
    breadcrumb: document.getElementById('breadcrumb'),
    searchInput: document.getElementById('searchInput'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Grids y contenedores
    gridAsignaturas: document.getElementById('grid-asignaturas'),
    gridTipos: document.getElementById('grid-tipos'),
    listaRecursos: document.getElementById('lista-recursos'),
    searchResults: document.getElementById('search-results'),
    
    // Títulos dinámicos
    tituloAsignaturas: document.getElementById('titulo-asignaturas'),
    tituloTipos: document.getElementById('titulo-tipos'),
    tituloRecursos: document.getElementById('titulo-recursos'),
    
    // Empty states
    emptyState: document.getElementById('empty-state'),
    searchEmpty: document.getElementById('search-empty')
};

/**
 * NAVEGACIÓN ENTRE VISTAS
 */
function mostrarVista(vistaId) {
    elementos.views.forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(`view-${vistaId}`).classList.add('active');
}

function actualizarBreadcrumb() {
    const contenido = elementos.breadcrumb.querySelector('.breadcrumb-content');
    let html = `
        <a href="#" class="breadcrumb-item ${!estado.cursoActual ? 'active' : ''}" data-level="home">
            <span>🏠</span> Inicio
        </a>
    `;
    
    if (estado.cursoActual) {
        const nombreCurso = DATOS.cursos[estado.cursoActual]?.nombre || estado.cursoActual;
        html += `
            <span class="breadcrumb-separator">›</span>
            <a href="#" class="breadcrumb-item ${!estado.asignaturaActual ? 'active' : ''}" data-level="curso" data-curso="${estado.cursoActual}">
                ${nombreCurso}
            </a>
        `;
    }
    
    if (estado.asignaturaActual) {
        const nombreAsignatura = DATOS.cursos[estado.cursoActual]?.asignaturas[estado.asignaturaActual]?.nombre || estado.asignaturaActual;
        html += `
            <span class="breadcrumb-separator">›</span>
            <a href="#" class="breadcrumb-item ${!estado.tipoActual ? 'active' : ''}" data-level="asignatura" data-asignatura="${estado.asignaturaActual}">
                ${nombreAsignatura}
            </a>
        `;
    }
    
    if (estado.tipoActual) {
        const nombreTipo = NOMBRES_TIPO[estado.tipoActual] || estado.tipoActual;
        html += `
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-item active">
                ${nombreTipo}
            </span>
        `;
    }
    
    contenido.innerHTML = html;
    
    // Event listeners para breadcrumb
    contenido.querySelectorAll('.breadcrumb-item[data-level]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const level = item.dataset.level;
            
            switch(level) {
                case 'home':
                    navegarAInicio();
                    break;
                case 'curso':
                    navegarACurso(item.dataset.curso);
                    break;
                case 'asignatura':
                    navegarAAsignatura(estado.cursoActual, item.dataset.asignatura);
                    break;
            }
        });
    });
}

/**
 * NAVEGACIÓN A DIFERENTES NIVELES
 */
function navegarAInicio() {
    estado.cursoActual = null;
    estado.asignaturaActual = null;
    estado.tipoActual = null;
    mostrarVista('home');
    actualizarBreadcrumb();
}

function navegarACurso(cursoId) {
    estado.cursoActual = cursoId;
    estado.asignaturaActual = null;
    estado.tipoActual = null;
    
    const curso = DATOS.cursos[cursoId];
    if (!curso) return;
    
    // Actualizar título
    elementos.tituloAsignaturas.textContent = `Asignaturas de ${curso.nombre}`;
    
    // Renderizar asignaturas
    const asignaturas = curso.asignaturas;
    let html = '';
    
    for (const [asigId, asig] of Object.entries(asignaturas)) {
        html += `
            <article class="card card-asignatura" data-asignatura="${asigId}">
                <div class="card-icon-tipo">📚</div>
                <div class="card-content">
                    <h2>${asig.nombre}</h2>
                    <p>${contarRecursos(asig.recursos)} recursos</p>
                </div>
                <span class="card-arrow">→</span>
            </article>
        `;
    }
    
    elementos.gridAsignaturas.innerHTML = html;
    
    // Event listeners para asignaturas
    elementos.gridAsignaturas.querySelectorAll('.card-asignatura').forEach(card => {
        card.addEventListener('click', () => {
            navegarAAsignatura(cursoId, card.dataset.asignatura);
        });
    });
    
    mostrarVista('asignaturas');
    actualizarBreadcrumb();
}

function navegarAAsignatura(cursoId, asignaturaId) {
    estado.cursoActual = cursoId;
    estado.asignaturaActual = asignaturaId;
    estado.tipoActual = null;
    
    const asignatura = DATOS.cursos[cursoId]?.asignaturas[asignaturaId];
    if (!asignatura) return;
    
    elementos.tituloTipos.textContent = asignatura.nombre;
    
    // Actualizar contadores en las tarjetas de tipos
    const tiposCards = elementos.gridTipos.querySelectorAll('.card-tipo');
    tiposCards.forEach(card => {
        const tipo = card.dataset.tipo;
        const cantidad = asignatura.recursos[tipo]?.length || 0;
        card.querySelector('p').textContent = `${cantidad} ${cantidad === 1 ? 'recurso' : 'recursos'}`;
    });
    
    mostrarVista('tipos');
    actualizarBreadcrumb();
}

function navegarATipo(tipoId) {
    estado.tipoActual = tipoId;
    
    const asignatura = DATOS.cursos[estado.cursoActual]?.asignaturas[estado.asignaturaActual];
    if (!asignatura) return;
    
    const recursos = asignatura.recursos[tipoId] || [];
    
    elementos.tituloRecursos.textContent = NOMBRES_TIPO[tipoId] || tipoId;
    
    renderizarRecursos(recursos, elementos.listaRecursos, elementos.emptyState);
    
    mostrarVista('recursos');
    actualizarBreadcrumb();
}

/**
 * RENDERIZADO DE RECURSOS
 */
function renderizarRecursos(recursos, contenedor, emptyState) {
    if (recursos.length === 0) {
        contenedor.innerHTML = '';
        emptyState?.classList.add('visible');
        return;
    }
    
    emptyState?.classList.remove('visible');
    
    let html = '';
    recursos.forEach(recurso => {
        html += `
            <a href="${recurso.archivo}" class="recurso-item" target="_blank" download>
                <span class="recurso-icon">${getIconoArchivo(recurso.tipo)}</span>
                <div class="recurso-info">
                    <div class="recurso-titulo">${recurso.titulo}</div>
                    <div class="recurso-meta">
                        <span class="recurso-badge">${recurso.tipo}</span>
                        ${recurso.fecha ? `<span>${formatearFecha(recurso.fecha)}</span>` : ''}
                    </div>
                </div>
                <span class="recurso-download">⬇️</span>
            </a>
        `;
    });
    
    contenedor.innerHTML = html;
}

/**
 * FUNCIONES AUXILIARES
 */
function contarRecursos(recursos) {
    let total = 0;
    for (const tipo in recursos) {
        total += recursos[tipo]?.length || 0;
    }
    return total;
}

/**
 * BÚSQUEDA
 */
function buscar(termino) {
    if (!termino || termino.length < 2) {
        navegarAInicio();
        return;
    }
    
    termino = termino.toLowerCase();
    const resultados = [];
    
    // Buscar en todos los recursos
    for (const [cursoId, curso] of Object.entries(DATOS.cursos)) {
        for (const [asigId, asig] of Object.entries(curso.asignaturas)) {
            for (const [tipoId, recursos] of Object.entries(asig.recursos)) {
                recursos.forEach(recurso => {
                    if (recurso.titulo.toLowerCase().includes(termino)) {
                        resultados.push({
                            ...recurso,
                            curso: curso.nombre,
                            asignatura: asig.nombre,
                            tipoNombre: NOMBRES_TIPO[tipoId]
                        });
                    }
                });
            }
        }
    }
    
    // Renderizar resultados
    if (resultados.length === 0) {
        elementos.searchResults.innerHTML = '';
        elementos.searchEmpty.classList.add('visible');
    } else {
        elementos.searchEmpty.classList.remove('visible');
        
        let html = '';
        resultados.forEach(recurso => {
            html += `
                <a href="${recurso.archivo}" class="recurso-item" target="_blank" download>
                    <span class="recurso-icon">${getIconoArchivo(recurso.tipo)}</span>
                    <div class="recurso-info">
                        <div class="recurso-titulo">${recurso.titulo}</div>
                        <div class="recurso-meta">
                            <span class="recurso-badge">${recurso.tipo}</span>
                            <span>${recurso.curso} · ${recurso.asignatura}</span>
                        </div>
                    </div>
                    <span class="recurso-download">⬇️</span>
                </a>
            `;
        });
        
        elementos.searchResults.innerHTML = html;
    }
    
    estado.cursoActual = null;
    estado.asignaturaActual = null;
    estado.tipoActual = null;
    mostrarVista('search');
    actualizarBreadcrumb();
}

/**
 * TEMA OSCURO/CLARO
 */
function toggleTema() {
    const body = document.body;
    const isDark = body.dataset.theme === 'dark';
    
    body.dataset.theme = isDark ? 'light' : 'dark';
    elementos.themeToggle.querySelector('.theme-icon').textContent = isDark ? '🌙' : '☀️';
    
    // Guardar preferencia
    localStorage.setItem('theme', body.dataset.theme);
}

function cargarTema() {
    const temaGuardado = localStorage.getItem('theme');
    const prefiereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const tema = temaGuardado || (prefiereDark ? 'dark' : 'light');
    document.body.dataset.theme = tema;
    elementos.themeToggle.querySelector('.theme-icon').textContent = tema === 'dark' ? '☀️' : '🌙';
}

/**
 * INICIALIZACIÓN
 */
function init() {
    // Cargar tema
    cargarTema();
    
    // Event listeners para cards de cursos
    document.querySelectorAll('.card-curso').forEach(card => {
        card.addEventListener('click', () => {
            navegarACurso(card.dataset.curso);
        });
    });
    
    // Event listeners para cards de tipos
    document.querySelectorAll('.card-tipo').forEach(card => {
        card.addEventListener('click', () => {
            navegarATipo(card.dataset.tipo);
        });
    });
    
    // Event listener para búsqueda
    let timeoutBusqueda;
    elementos.searchInput.addEventListener('input', (e) => {
        clearTimeout(timeoutBusqueda);
        timeoutBusqueda = setTimeout(() => {
            buscar(e.target.value.trim());
        }, 300);
    });
    
    // Event listener para tema
    elementos.themeToggle.addEventListener('click', toggleTema);
    
    // Navegación con teclas
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (estado.tipoActual) {
                navegarAAsignatura(estado.cursoActual, estado.asignaturaActual);
            } else if (estado.asignaturaActual) {
                navegarACurso(estado.cursoActual);
            } else if (estado.cursoActual) {
                navegarAInicio();
            }
        }
    });
    
    // Soporte para navegación del navegador (atrás/adelante)
    window.addEventListener('popstate', () => {
        navegarAInicio();
    });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
