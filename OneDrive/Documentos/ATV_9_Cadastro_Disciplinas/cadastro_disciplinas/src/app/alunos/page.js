'use client'

import Pagina from '../components/Paginas'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'


export default function AlunosPage() {
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || []
    setAlunos(alunosLocalStorage)
  }, [])

  // Função para excluir aluno
  function excluir(aluno) {
    if (window.confirm(`Deseja realmente excluir o aluno ${aluno.nome}?`)) {
      const novaLista = alunos.filter(item => item.id !== aluno.id)
      localStorage.setItem('alunos', JSON.stringify(novaLista))
      setAlunos(novaLista)
      alert("Aluno excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Alunos"}>
      <div className='text-end mb-2'>
        <Button href='/alunos/form'><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Faculdade</th>
            <th>Curso</th>
            <th>Período</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td><img src={aluno.foto} alt={aluno.nome} width="50" /></td>
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.sobrenome}</td>
              <td>{aluno.faculdade}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.periodo}</td>
              <td>
                <Button variant="warning" href={`/alunos/form?id=${aluno.id}`}><FaPen /></Button>
                <Button variant="danger" onClick={() => excluir(aluno)} className='ms-2'><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
