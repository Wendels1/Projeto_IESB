'use client'

import Pagina from './components/Paginas'
import { Button, Card, Col, Row } from 'react-bootstrap'


export default function HomePage() {


  const faculdades = JSON.parse(localStorage.getItem("faculdades")) || []
  const cursos = JSON.parse(localStorage.getItem("cursos")) || []
  const professores = JSON.parse(localStorage.getItem("professores")) || []
  const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || []
  const alunos = JSON.parse(localStorage.getItem("alunos")) || []

  const lista = [
    {
      nome: "Faculdades",
      imagem: "https://i.pinimg.com/236x/53/f4/63/53f463fcc23af8ec4fc28e7c5ccd168a.jpg", quantidade: faculdades.length,
      link: "/faculdades"
    },
    {
      nome: "Cursos",
      imagem: "https://i.pinimg.com/474x/b2/1d/08/b21d0843c3a0d5f5586222644bf402cd.jpg", quantidade: cursos.length,
      link: "/cursos"
    },
    {
      nome: "Professores",
      imagem: "https://i.pinimg.com/736x/39/09/fb/3909fb65bbab271bb5a9ddbf85c80d00.jpg", quantidade: professores.length,
      link: "/professores"
    },
    {
      nome: "Disciplinas",
      imagem: "https://i.pinimg.com/236x/79/0f/fc/790ffceeb183a1059b77c5558342ffc0.jpg", quantidade: disciplinas.length,
      link: "/disciplinas"
    },
    {
      nome: "Alunos",
      imagem: "https://i.pinimg.com/236x/ce/96/4d/ce964d843b92374b8b96e105ffa82831.jpg", quantidade: alunos.length,
      link: "/alunos"
    },
  ]



  return (
    <Pagina titulo={"Projeto IESB"}>
      <Row md={4}>
        {lista.map(item => (
          <Col className='py-2'>
            <Card style={{height: '100%'}}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

      </Row>
    </Pagina>
  )
}