import { zodResolver } from '@hookform/resolvers/zod';
import {SubmitHandler,useForm} from 'react-hook-form';
import {z} from "zod";

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

export default function TraineedataForm({className,style}: TraineedataFormProps) {

    type FormData = z.infer<typeof schema>;

    const {register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
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
        <form className={className} style={style} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div><label>Name with initials</label></div>
                <div>
                    <input {...register("name")}
                        type="text" placeholder="Enter the name..."/>
                    {errors.name && (
                        <div className='text-danger'>{errors.name.message}</div>
                    )}
                </div>
            </div>
    
            <div>
                <div>
                    <label>Full Name</label>
                </div>
                <div>
                    <input {...register("fullname")} type="text" placeholder="Enter the full name..."/>
                    {errors.fullname && (
                        <div className='text-danger'>{errors.fullname.message}</div>
                    )}
                </div>
            </div>

            <div>
                <div>
                    <label>NIC No</label>
                </div>
                <div>
                    <input {...register("nicNo")} type="text" placeholder="Enter NIC No..."/>
                    {errors.nicNo && (
                        <div className='text-danger'>{errors.nicNo.message}</div>
                    )}
                </div>
            </div>


            <div>
                <div>
                    <label>Contact Information</label>
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input {...register("contactNo.mobileNo")} type="number" placeholder="Enter Mobile No..."/>
                    {errors.contactNo?.mobileNo && (
                        <div className='text-danger'>{errors.contactNo?.mobileNo.message}</div>
                    )}
                </div>
                <div>
                    <label>Residence No:</label>
                    <input {...register("contactNo.residenceNo")} type="number" placeholder="Enter Residence No..."/>
                    {errors.contactNo?.residenceNo && (
                        <div className='text-danger'>{errors.contactNo?.residenceNo.message}</div>
                    )}
                </div>
                <div>
                    <label>Email:</label>
                    <input {...register("contactNo.email")} type="text" placeholder="Enter Email..."/>
                    {errors.contactNo?.email && (
                        <div className='text-danger'>{errors.contactNo?.email.message}</div>
                    )}
                </div>
            </div>

            <div>
                <div>
                    <label>Address</label>
                </div>
                <div>
                    <input {...register("address")} type="text" placeholder="Enter the Address..."/>
                    {errors.address && (
                        <div className='text-danger'>{errors.address.message}</div>
                    )}
                </div>
            </div>

            <div>
                <div>
                    <label>Training Institute</label>
                </div>
                <div>
                    <input {...register("trainingInstitute")} type="text" placeholder="Enter the Training Institute..."/>
                    {errors.trainingInstitute && (
                        <div className='text-danger'>{errors.trainingInstitute.message}</div>
                    )}
                </div>
            </div>

            <div>
                <div>
                    <label>Course</label>
                </div>
                <div>
                    <input {...register("course")} type="text" placeholder="Enter the Course..."/>
                    {errors.course && (
                        <div className='text-danger'>{errors.course.message}</div>
                    )}
                </div>
            </div>

            <div>
                <div>
                    <label>Emergency Contact</label>
                </div>
                <div>
                    <label>Name:</label>
                    <input {...register("emergencyContact.name")} type="text" placeholder="Enter the name..."/>
                    {errors.emergencyContact?.name && (
                        <div className='text-danger'>{errors.emergencyContact?.name.message}</div>
                    )}
                </div>
                <div>
                    <label>Telephone:</label>
                    <input {...register("emergencyContact.telephone")} type="number" placeholder="Enter the telephone..."/>
                    {errors.emergencyContact?.telephone && (
                        <div className='text-danger'>{errors.emergencyContact?.telephone.message}</div>
                    )}
                </div>
            </div>

            <div>
                <div>
                    <label>Bank Details</label>
                </div>
                <div>
                    <label>Account No:</label>
                    <input {...register("bankDetails.accountNo")} type='number' placeholder='Enter the Account No...'/>
                    {errors.bankDetails?.accountNo && (
                        <div className='text-danger'>{errors.bankDetails?.accountNo.message}</div>
                    )}
                </div>
                <div>
                    <label>Branch:</label>
                    <input {...register("bankDetails.branch")} type='text' placeholder='Enter the Branch...'/>
                    {errors.bankDetails?.branch && (
                        <div className='text-danger'>{errors.bankDetails?.branch.message}</div>
                    )}
                </div>
                <div>
                    <label>Branch Code:</label>
                    <input {...register("bankDetails.branchCode")} type='text' placeholder='Enter the Branch Code...'/>
                    {errors.bankDetails?.branchCode && (
                        <div className='text-danger'>{errors.bankDetails?.branchCode.message}</div>
                    )}
                </div>
          </div>

            <input disabled={isSubmitting} type="submit" value={isSubmitting? "Loading..." : "Submit"} className="mt-2 btn btn-primary" style={{width:'fit-content'}}/>
            <input type="reset" value="Reset" className="mt-2 btn btn-secondary" style={{width:'fit-content'}}/> 
            {errors.root && (
                        <div className='text-danger'>{errors.root.message}</div>
                    )}
        </form>
    )
}