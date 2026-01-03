import { set } from "mobx";
import { getRoot, onSnapshot, types } from "mobx-state-tree"; // alternatively: import { t } from "mobx-state-tree"
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthUserModel = types.model('AuthUserModel', {
  username: types.identifier,
  phone: types.string,
  password: types.string,
  school_name: types.string,
  class_name: types.string,
});

const StudentModel = types
  .model('StudentModel', {
    id: types.identifier,
    full_name: types.string,
  }).views((self) => ({
    get status() {
        const {selectedDate, attendances} = getRoot(self);
      return attendances.find(att => att.student.id === self.id && att.date === selectedDate)?.status;
    },
      get isSaved() {
        const {selectedDate, attendances} = getRoot(self);
      return attendances.find(att => att.student.id === self.id && att.date === selectedDate)?.isSaved;
    }
  }
  ))
  .actions((self) => ({
    setFullName(value: string) {
      self.full_name = value;
    },
    getAttendanceStatus(){
      const {selectedDate, attendances} = getRoot(self);
      return attendances.find(att => att.student.id === self.id && att.date === selectedDate)?.status;
    },
    setAttendanceStatus(status: string, date: string){
      const {addAttendance} = getRoot(self);
      addAttendance(self.id, date, status);
    },

  }));

const DarasaModel = types
  .model('DarasaModel', {
    id: types.identifier,
    name: types.string,
    created_by: types.reference(AuthUserModel),
    students: types.array(StudentModel),
  })
  .actions((self) => ({
    addStudent(full_name: string) {
      const student = StudentModel.create({
        full_name,
        id: new Date().getTime().toString(),
      });
      self.students.push(student);
    },
    removeStudent(student: any) {
      const index = self.students.findIndex((s) => s.id === student);
      if (index > -1) {
        self.students.splice(index, 1);
      } 
    },
    setName(value: string) {
      self.name = value;
    },
  }));

const Attendance = types.model('Attendance', {
  id: types.identifier,
  student: types.reference(StudentModel),
  date: types.string,
  status: types.string,
  isSaved: types.optional(types.boolean, false),
})  .actions((self) => ({
    setStatus(value: string) {
      self.status = value;
    },
    setIsSaved(value: boolean) {
      self.isSaved = value;
    }
  }));

// Define a store just like a model
const RootStoreModel = types
  .model('RootStoreModel', {
    authUser: types.maybeNull(AuthUserModel),
    darasas: types.array(DarasaModel),
    students: types.array(DarasaModel),
    attendances: types.array(Attendance),
    selectedStudent: types.maybeNull(types.safeReference(StudentModel)),
    selectedDarasa: types.maybeNull(types.safeReference(DarasaModel)),
    selectedDate: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setSelectedDarasa(value: string | null) {
      self.selectedDarasa = value;
    },
    setAuthUser(user: any) {
      self.authUser = user;
    },
    setSelectedStudent(student: any) {
      self.selectedStudent = student;
    },
    setSelectedDate(date: string) {
      self.selectedDate = date;
    },
    addDarasa(id: any,name:any) {
      self.darasas.push({id,name,created_by:'steve',students:[]});
      self.selectedDarasa = name.id;
    },
    removeDarasa(darasa: string) {
      const index = self.darasas.findIndex((s) => s.id === darasa);
      console.log("Removing darasa with id:", darasa, "at index:", index);
      if (index > -1) {
        self.darasas.splice(index, 1);
      } 
    },
    addAttendance(studentId: string, date: string, status: string) {
      const attendance = self.attendances.find(
        (att) => att.student.id === studentId && att.date === date
      );
      if(attendance){
        attendance.setStatus(status);
      }else{
        self.attendances.push({
          id: new Date().getTime().toString(),
          student: studentId,
          date,
          status,
        });
      }
    },
    saveAttendance() {
      const {selectedDate, selectedDarasa, attendances} = self;
      if(!selectedDarasa || !selectedDate) return;
      selectedDarasa.students.forEach((student) => {
        const attendance = attendances.find(
          (att) => att.student.id === student.id && att.date === selectedDate
        );
        if(attendance){
          attendance.setIsSaved(true);
        }
      });
    }
  }));

export const rootStore = RootStoreModel.create({
  authUser: null,
  darasas: [],
  students: [],
  attendances: [],
  selectedDarasa: null,
});

onSnapshot(rootStore, (snapshot) => {
  AsyncStorage.setItem("rootStore", JSON.stringify(snapshot));
});
