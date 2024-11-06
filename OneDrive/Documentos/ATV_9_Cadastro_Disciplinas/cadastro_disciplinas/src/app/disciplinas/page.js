'use client'

import Pagina from '../components/Paginas'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'


export default function DisciplinasPage() {

  const [disciplinas, setDisciplinas] = useState([])
  const [cursos, setCursos] = useState([])
  const [professores, setProfessores] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const disciplinasLocalStorage = JSON.parse(localStorage.getItem("disciplinas")) || []
    const cursosLocalStorage = JSON.parse(localStorage.getItem('cursos')) || []
    const professoresLocalStorage = JSON.parse(localStorage.getItem('professores')) || []

    // Guarda as listas no estado
    setDisciplinas(disciplinasLocalStorage)
    setCursos(cursosLocalStorage)
    setProfessores(professoresLocalStorage)

    console.log(disciplinasLocalStorage, cursosLocalStorage, professoresLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(disciplina) {
    if (window.confirm(`Deseja realmente excluir a disciplina ${disciplina.nome}?`)) {
      const novaLista = disciplinas.filter(item => item.id !== disciplina.id)
      localStorage.setItem('disciplinas', JSON.stringify(novaLista))
      setDisciplinas(novaLista)
      alert("Disciplina excluída com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Disciplinas"}>
      <div className='text-end mb-2'>
        <Button href='/disciplinas/form'><FaPlusCircle /> Nova Disciplina</Button>
      </div>

      {/* Tabela com as disciplinas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Curso</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map(disciplina => {
            // Buscar o nome do curso e do professor utilizando os IDs
            const curso = cursos.find(c => c.id === disciplina.curso)
            const professor = professores.find(p => p.id === disciplina.professor)

            return (
              <tr key={disciplina.id}>
                <td>{disciplina.nome}</td>
                <td>{disciplina.descricao}</td>
                <td>{disciplina.status}</td>
                <td>{curso ? curso.nome : 'Curso não encontrado'}</td>
                <td>{professor ? professor.nome : 'Professor não encontrado'}</td>
                <td className='text-center'>
                  <Button className='me-2' href={`/disciplinas/form?id=${disciplina.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(disciplina)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
