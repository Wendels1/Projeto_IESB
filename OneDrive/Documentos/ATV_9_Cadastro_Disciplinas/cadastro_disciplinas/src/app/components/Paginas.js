'use client'

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Formulários" id="basic-nav-dropdown">
              <NavDropdown.Item href="/faculdades/form">Formulário Faculdade</NavDropdown.Item>
              <NavDropdown.Item href="/cursos/form">Formulário Curso</NavDropdown.Item>
              <NavDropdown.Item href="/professores/form">Formulário Professor</NavDropdown.Item>
              <NavDropdown.Item href="/alunos/form">Formulário Aluno</NavDropdown.Item>
              <NavDropdown.Item href="/disciplinas/form">Formulário Disciplina</NavDropdown.Item>
              
            </NavDropdown>
            <Nav.Link href="/faculdades">Faculdades</Nav.Link>
            <Nav.Link href="/cursos">Cursos</Nav.Link>
            <Nav.Link href="/professores">Professores</Nav.Link>
            <Nav.Link href="/alunos">Alunos</Nav.Link>
            <Nav.Link href="/disciplinas">Disciplinas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}