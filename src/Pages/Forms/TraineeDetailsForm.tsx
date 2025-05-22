import { zodResolver } from '@hookform/resolvers/zod';
import {SubmitHandler,useForm} from 'react-hook-form';
import {z} from "zod";
import Label from '../../components/form/Label';
import ComponentCard from '../../components/common/ComponentCard';
import Input from '../../components/form/input/InputField';

interface TraineedataFormProps {
    className?: string;
    style?: object;
}

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    fullname: z.string().min(1, "Full name is required"),
    nicNo: z.string().min(10, "Valid NIC number is required"),
    contactNo: z.object({
        mobileNo: z.coerce.number().min(10, "Valid mobile number is required"),
        residenceNo: z.coerce.number().min(10, "Valid residence number is required"),
        email: z.string().email()
    }),
    address: z.string().min(1, "Address is required"),
    trainingInstitute: z.string().min(1, "Training institute is required"),
    course: z.string().min(1, "Course is required"),
    emergencyContact: z.object({
        name: z.string().min(1, "Emergency contact name is required"),
        telephone: z.coerce.number().min(10, "Valid telephone number is required")
    }),
    bankDetails: z.object({
        accountNo: z.coerce.number().min(8, "Account number is required"),
        branch: z.string().min(1, "Branch name is required"),
        branchCode: z.string().min(1, "Branch code is required")
    })
});

export default function TraineeDetailsForm({className,style}: TraineedataFormProps) {

    type FormData = z.infer<typeof schema>;

    const {register,
        handleSubmit,
        setError,
        reset,
        formState: {errors, isSubmitting, isValid}
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {await new Promise ((resolve) => setTimeout(resolve,1000));
        console.log(data);
        
        } catch (error){
            setError("root",{
                message: "Field is required"
            });
        }
    };

    return(
        <ComponentCard title="Trainee Data Form">
            <form className={className} style={style} onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">Name with initials</Label>
                    <Input<FormData>
                    name='name'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter the name..."
                    error={!!errors.name}
                    hint={errors.name?.message}
                    />
                </div>
        
                <div>
                    <Label htmlFor="fullname">Full name</Label>
                    <Input<FormData>
                    name='fullname'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter the full name..."
                    error={!!errors.fullname}
                    hint={errors.fullname?.message}
                    />
                </div>

                <div>
                    <Label htmlFor="nicNo">NIC No</Label>
                    <Input<FormData>
                    name='nicNo'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter NIC No..."
                    error={!!errors.nicNo}
                    hint={errors.nicNo?.message} />
                </div>


                <div>
                    <Label>Contact Information</Label>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="w-full">
                        <Label htmlFor="contactNo.mobileNo">Mobile No:</Label>
                        <Input<FormData>
                        name='contactNo.mobileNo'
                        register={register}
                        errors={errors}
                        type="text"
                        placeholder="Enter Mobile No..."
                        error={!!errors.contactNo?.mobileNo}
                        hint={errors.contactNo?.mobileNo?.message} />
                    </div>

                    <div className="w-full">
                    <Label htmlFor="contactNo.residenceNo">Residence No:</Label>
                    <Input<FormData>
                    name='contactNo.residenceNo'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Residence No..."
                    error={!!errors.contactNo?.residenceNo}
                    hint={errors.contactNo?.residenceNo?.message} />
                    </div>

                    <div className="w-full">
                    <Label htmlFor="contactNo.email">Email:</Label>
                    <Input<FormData>
                    name='contactNo.email'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Email..."
                    error={!!errors.contactNo?.email}
                    hint={errors.contactNo?.email?.message} />
                    </div>

                    </div>
                </div>

                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input<FormData>
                    name='address'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter the Address..."
                    error={!!errors.address}
                    hint={errors.address?.message} />                   
                </div>

                <div>
                    <Label htmlFor="trainingInstitute">Training Institute</Label>
                    <Input<FormData>
                    name='trainingInstitute'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter the Training Institute..."
                    error={!!errors.trainingInstitute}
                    hint={errors.trainingInstitute?.message} />
                </div>

                <div>
                    <Label htmlFor="course">Course</Label>
                    <Input<FormData>
                    name='course'
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter the Course..."
                    error={!!errors.course}
                    hint={errors.course?.message} />
                </div>

                <div>
                    <div>
                        <Label>Emergency Contact</Label>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="w-full">
                        <Label htmlFor="emergencyContact.name">Name:</Label>
                        <Input<FormData>
                        name='emergencyContact.name'
                        register={register}
                        errors={errors}
                        type="text"
                        placeholder="Enter the name..."
                        error={!!errors.emergencyContact?.name}
                        hint={errors.emergencyContact?.name?.message} />
                        </div>

                        <div className="w-full">
                        <Label htmlFor="emergencyContact.telephone">Telephone:</Label>
                        <Input<FormData>
                        name='emergencyContact.telephone'
                        register={register}
                        errors={errors}
                        type="text"
                        placeholder="Enter the telephone..."
                        error={!!errors.emergencyContact?.telephone}
                        hint={errors.emergencyContact?.telephone?.message} />
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <Label>Bank Details</Label>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="w-full">
                        <Label htmlFor="bankDetails.accountNo">Account No:</Label>
                        <Input<FormData>
                        name='bankDetails.accountNo'
                        register={register}
                        errors={errors}
                        type="text"
                        placeholder="Enter the Account No..."
                        error={!!errors.bankDetails?.accountNo}
                        hint={errors.bankDetails?.accountNo?.message} />
                        </div>

                        <div className="w-full">
                        <Label htmlFor="bankDetails.branch">Branch:</Label>
                        <Input<FormData>
                        name='bankDetails.branch'
                        register={register}
                        errors={errors}
                        type="text"
                        placeholder="Enter the Branch..."
                        error={!!errors.bankDetails?.branch}
                        hint={errors.bankDetails?.branch?.message} />
                        </div>

                        <div className="w-full">            
                        <Label htmlFor="nicNo">Branch Code:</Label>
                        <Input<FormData>
                        name='bankDetails.branchCode'
                        register={register}
                        errors={errors}
                        type="text"
                        placeholder="Enter the Branch Code..."
                        error={!!errors.bankDetails?.branchCode}
                        hint={errors.bankDetails?.branchCode?.message} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-brand-300"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                >
                    Reset
                </button>
                </div>
                </div>
            </form>
        </ComponentCard>
    )
}