import TraineedataForm from "../Components/Forms/TraineedataForm";

export default function TraineedataPage() {
  return (
    <>
    <h2>Traineedata</h2>
    <TraineedataForm
      className= ""
      style={{display: 'grid',
        padding:'40px',
        alignItems: 'center',
        height: '130vh'
      }}
    />
    </>
  )
}