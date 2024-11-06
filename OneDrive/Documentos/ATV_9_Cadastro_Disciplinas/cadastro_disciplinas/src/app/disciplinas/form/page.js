'use client'



import Pagina from '@/app/components/Paginas'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashAlt } from "react-icons/fa"
import * as Yup from 'yup'

export default function CadastroDisciplinas() {
    const router = useRouter()
  
    const [cursos, setCursos] = useState([])
    const [professores, setProfessores] = useState([])
    const [professoresFiltrados, setProfessoresFiltrados] = useState([])
  
    useEffect(() => {
      const cursosSalvos = JSON.parse(localStorage.getItem('cursos')) || []
      const professoresSalvos = JSON.parse(localStorage.getItem('professores')) || []
      setCursos(cursosSalvos)
      setProfessores(professoresSalvos)
    }, [])
  
    const disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || []
  
    function salvar(dados) {
      dados.id = new Date().getTime()
      disciplinas.push(dados)
      localStorage.setItem('disciplinas', JSON.stringify(disciplinas))
      alert("Disciplina criada com sucesso!")
      router.push("/disciplinas")
    }
  
    const initialValues = {
      nome: '',
      descricao: '',
      status: 'ativo',
      curso: '',
      professor: ''
    }
  
    const validationSchema = Yup.object().shape({
      nome: Yup.string().required("Campo obrigatório"),
      descricao: Yup.string().required("Campo obrigatório"),
      status: Yup.string().required("Campo obrigatório"),
      curso: Yup.string().required("Campo obrigatório"),
      professor: Yup.string().required("Campo obrigatório")
    })
  
    return (
      <Pagina titulo="Cadastro de Disciplinas">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={salvar}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => {
  
            useEffect(() => {
              if (values.curso !== '') {
                const filtrados = professores.filter(p => p.cursoId === values.curso)
                setProfessoresFiltrados(filtrados)
              }
            }, [values.curso])
  
            return (
              <Form onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>
              

                  <Form.Group as={Col}>
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control
                      name='descricao'
                      type='text'
                      value={values.descricao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.descricao && !errors.descricao}
                      isInvalid={touched.descricao && errors.descricao}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
                  </Form.Group>
                </Row>
  
                <Row className='mb-3'>
                  <Form.Group as={Col}>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select
                      name='status'
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.status && !errors.status}
                      isInvalid={touched.status && errors.status}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                  </Form.Group>
  
                  <Form.Group as={Col}>
                    <Form.Label>Curso:</Form.Label>
                    <Form.Select
                      name='curso'
                      value={values.curso}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.curso && !errors.curso}
                      isInvalid={touched.curso && errors.curso}
                    >
                      <option value="">Selecione</option>
                      {cursos.map(curso => <option key={curso.id} value={curso.id}>{curso.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.curso}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Professor:</Form.Label>
                    <Form.Select
                      name='professor'
                      value={values.professor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!values.curso}
                      isValid={touched.professor && !errors.professor}
                      isInvalid={touched.professor && errors.professor}
                    >
                      <option value="">Selecione</option>
                      {professores.map(prof => <option key={prof.id} value={prof.id}>{prof.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.professor}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className='d-flex justify-content-between'>
                  <Button type="button" variant="secondary" onClick={() => router.push("/")}>
                    <FaArrowLeft /> Voltar
                  </Button>

                  <div className="d-flex gap-2">
                    <Button onClick={resetForm} variant="danger">
                      <FaTrashAlt /> Limpar
                    </Button>
                    <Button type='submit' variant='success'>
                      <FaCheck /> Enviar
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            )
          }}
        </Formik>
      </Pagina>
    )
}
