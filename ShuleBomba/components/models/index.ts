import { types } from "mobx-state-tree" // alternatively: import { t } from "mobx-state-tree"

const AuthUserModel = types.model({
  username: types.identifier,
  full_name: types.string,
  phone: types.string,
  password: types.string,
  school_name: types.string
})

const StudentModel = types.model({
  id: types.identifier,
  full_name: types.string,
}).actions((self) => ({
  setFullName(value:string){
    self.full_name=value;
  }
  setDarasa(value: string){
    self.darasa = value;
  }
}))

const DarasaModel = types.model({
  id: types.identifier,
  name: types.string,
  created_by: types.reference(AuthUserModel),
  students: types.array(StudentModel)
}).actions((self)=>({
    addStudent(full_name: string) {
      const student = StudentModel.create({
        full_name,
        id: (new Date().getTime()).toString()
      })
      self.students.push(student) 
    },
  removeStudent(student){
    self.students = self.students.filter(s=>s.id!==student.identifier)
  },
  setName(value){
    self.name=value;
  }

}))


const Attendance = types.model({
  id: types.identifier,
  student: types.reference(StudentModel),
  date: types.string,
  status: types.string
})


// Define a store just like a model
const RootStoreModel = types.model({
  authUser: types.maybeNull(AuthUserModel),
  darasas: types.array(DarasaModel),
  attendances: types.array(Attendance),
  selectedDarasa: types.maybeNull(types.reference(DarasaModel)),
}).actions((self) => ({
    setSelectedDarasa(value:any) {
      self.selectedDarasa=value;
    },
  }))

export const rootStore = RootStoreModel.create({
  authUser: null,
  darasa: [],
  attendances: [],
  selectedDarasa: null
})