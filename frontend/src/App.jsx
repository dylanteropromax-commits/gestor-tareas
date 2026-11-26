import { useEffect, useState } from 'react';

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('Cargando tareas...');
  const [guardando, setGuardando] = useState(false);
  const cargando = estado === 'Cargando tareas...';

  useEffect(() => {
    fetch('/api/tareas')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((datos) => {
        setTareas(datos);
        setEstado('');
      })
      .catch(() => setEstado('No se pudo cargar la lista.'));
  }, []);

  async function agregar(evento) {
    evento.preventDefault();
    if (!titulo.trim() || guardando || cargando) return;
    setGuardando(true);
    try {
      const r = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: titulo.trim() }),
      });
      if (!r.ok) throw new Error();
      const nueva = await r.json();
      setTareas((actuales) => [...actuales, nueva]);
      setTitulo('');
      setEstado('Tarea agregada.');
    } catch {
      setEstado('No se pudo guardar la tarea.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <main>
      <h1>Mis tareas</h1>
      <form onSubmit={agregar}>
        <label htmlFor="titulo">Nueva tarea</label>{' '}
        <input
          id="titulo"
          value={titulo}
          required
          maxLength={80}
          disabled={guardando}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button disabled={cargando || guardando || !titulo.trim()}>
          Agregar
        </button>
      </form>
      <p role="status">{estado}</p>
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.titulo}</li>
        ))}
      </ul>

      <h1>Contador de tareas: {tareas.length}</h1>
    </main>
  );

}