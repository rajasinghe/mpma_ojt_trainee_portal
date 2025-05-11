import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TraineeDetailsForm from "./Forms/TraineeDetailsForm";

export default function TraineedataPage() {
  return (
    <div>
      <PageMeta
        title="Add Trainee Data"
        description=""
      />
      <PageBreadcrumb pageTitle="Add Trainee Data" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          
        </div>
        <TraineeDetailsForm />
      </div>
    </div>
  );
}
