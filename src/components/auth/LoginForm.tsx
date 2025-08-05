// 'use client';

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Search, ChevronDown } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';
// import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
// import useChatStore from '@/store/useChatStore';
// import { Country } from '@/types';
// import toast from 'react-hot-toast';

// const phoneSchema = z.object({
//   countryCode: z.string().min(1, 'Please select a country'),
//   phoneNumber: z.string()
//     .min(10, 'Phone number must be at least 10 digits')
//     .regex(/^\d+$/, 'Phone number must contain only digits'),
// });

// const otpSchema = z.object({
//   otp: z.string()
//     .length(6, 'OTP must be 6 digits')
//     .regex(/^\d+$/, 'OTP must contain only digits'),
// });

// type PhoneFormData = z.infer<typeof phoneSchema>;
// type OTPFormData = z.infer<typeof otpSchema>;

// export const LoginForm = () => {
//   const [step, setStep] = useState<'phone' | 'otp'>('phone');
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false);
//   const [countrySearch, setCountrySearch] = useState('');
//   const [sentOTP, setSentOTP] = useState('');
//   const [phoneData, setPhoneData] = useState<PhoneFormData | null>(null);
  
//   const { countries, isLoading, login, setCountries, setIsLoading } = useChatStore();

//   const phoneForm = useForm<PhoneFormData>({
//     resolver: zodResolver(phoneSchema),
//     defaultValues: {
//       countryCode: '',
//       phoneNumber: '',
//     },
//   });

//   const otpForm = useForm<OTPFormData>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: {
//       otp: '',
//     },
//   });

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flag,cca2');
//         const data: Country[] = await response.json();
        
//         const validCountries = data
//           .filter(country => country.idd?.root && country.idd?.suffixes?.length > 0)
//           .sort((a, b) => a.name.common.localeCompare(b.name.common));
        
//         setCountries(validCountries);
//       } catch (error) {
//         toast.error('Failed to load countries');
//         console.error('Error fetching countries:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (countries.length === 0) {
//       fetchCountries();
//     }
//   }, [countries.length, setCountries, setIsLoading]);

//   const filteredCountries = countries.filter(country =>
//     country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
//   );

//   const selectedCountry = countries.find(c => 
//     phoneForm.watch('countryCode') === `${c.idd.root}${c.idd.suffixes[0]}`
//   );

//   const handlePhoneSubmit = (data: PhoneFormData) => {
//     setPhoneData(data);
//     // Simulate OTP generation
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     setSentOTP(otp);
//     setStep('otp');
//     toast.success(`OTP sent to ${data.countryCode}${data.phoneNumber}`);
//     // In development, show the OTP
//     if (process.env.NODE_ENV === 'development') {
//       toast.success(`Development OTP: ${otp}`);
//     }
//   };

//   const handleOTPSubmit = (data: OTPFormData) => {
//     if (data.otp === sentOTP && phoneData) {
//       login(phoneData.phoneNumber, phoneData.countryCode);
//     } else {
//       toast.error('Invalid OTP. Please try again.');
//       otpForm.setError('otp', { message: 'Invalid OTP' });
//     }
//   };

//   const handleCountrySelect = (country: Country) => {
//     const code = `${country.idd.root}${country.idd.suffixes[0]}`;
//     phoneForm.setValue('countryCode', code);
//     setShowCountryDropdown(false);
//     setCountrySearch('');
//   };

//   if (step === 'phone') {
//     return (
//       <div className="max-w-md mx-auto space-y-6">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Welcome to Gemini Chat
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Enter your phone number to get started
//           </p>
//         </div>

//         <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Country
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowCountryDropdown(!showCountryDropdown)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isLoading}
//               >
//                 {selectedCountry ? (
//                   <span className="flex items-center space-x-2">
//                     <span>{selectedCountry.flag}</span>
//                     <span className="text-gray-900 dark:text-white">
//                       {selectedCountry.name.common}
//                     </span>
//                     <span className="text-gray-500 dark:text-gray-400">
//                       ({phoneForm.watch('countryCode')})
//                     </span>
//                   </span>
//                 ) : (
//                   <span className="text-gray-500 dark:text-gray-400">
//                     {isLoading ? 'Loading countries...' : 'Select a country'}
//                   </span>
//                 )}
//                 <ChevronDown className="h-4 w-4 text-gray-400" />
//               </button>

//               {showCountryDropdown && !isLoading && (
//                 <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden">
//                   <div className="p-2 border-b border-gray-200 dark:border-gray-600">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         type="text"
//                         placeholder="Search countries..."
//                         value={countrySearch}
//                         onChange={(e) => setCountrySearch(e.target.value)}
//                         className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
//                   <div className="max-h-48 overflow-y-auto">
//                     {filteredCountries.map((country) => (
//                       <button
//                         key={country.cca2}
//                         type="button"
//                         onClick={() => handleCountrySelect(country)}
//                         className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center space-x-2"
//                       >
//                         <span>{country.flag}</span>
//                         <span className="text-gray-900 dark:text-white">
//                           {country.name.common}
//                         </span>
//                         <span className="text-gray-500 dark:text-gray-400 ml-auto">
//                           {country.idd.root}{country.idd.suffixes[0]}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             {phoneForm.formState.errors.countryCode && (
//               <p className="text-sm text-red-600 dark:text-red-400">
//                 {phoneForm.formState.errors.countryCode.message}
//               </p>
//             )}
//           </div>

//           <Input
//             label="Phone Number"
//             {...phoneForm.register('phoneNumber')}
//             error={phoneForm.formState.errors.phoneNumber?.message}
//             placeholder="Enter your phone number"
//             type="tel"
//           />

//           <Button
//             type="submit"
//             className="w-full"
//             isLoading={phoneForm.formState.isSubmitting}
//             disabled={isLoading}
//           >
//             Send OTP
//           </Button>
//         </form>

//         {isLoading && (
//           <div className="space-y-3">
//             <LoadingSkeleton className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
//             <LoadingSkeleton count={3} />
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           Enter OTP
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           We've sent a 6-digit code to {phoneData?.countryCode}{phoneData?.phoneNumber}
//         </p>
//       </div>

//       <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4">
//         <Input
//           label="6-Digit OTP"
//           {...otpForm.register('otp')}
//           error={otpForm.formState.errors.otp?.message}
//           placeholder="000000"
//           maxLength={6}
//           className="text-center text-2xl tracking-widest"
//         />

//         <Button
//           type="submit"
//           className="w-full"
//           isLoading={otpForm.formState.isSubmitting}
//         >
//           Verify OTP
//         </Button>

//         <Button
//           type="button"
//           variant="ghost"
//           className="w-full"
//           onClick={() => setStep('phone')}
//         >
//           Back to Phone Number
//         </Button>
//       </form>
//     </div>
//   );
// };

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import useChatStore from '@/store/useChatStore';
import { Country } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

const phoneSchema = z.object({
  countryCode: z.string().min(1, 'Please select a country'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export const LoginForm = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [sentOTP, setSentOTP] = useState('');
  const [phoneData, setPhoneData] = useState<PhoneFormData | null>(null);

  const { countries, isLoading, login, setCountries, setIsLoading } = useChatStore();

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '',
      phoneNumber: '',
    },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flag,cca2');
        const data: Country[] = await response.json();

        const validCountries = data
          .filter((country) => country.idd?.root && country.idd?.suffixes?.length > 0)
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

        setCountries(validCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        toast.error('Failed to load countries');
      } finally {
        setIsLoading(false);
      }
    };

    if (countries.length === 0) {
      fetchCountries();
    }
  }, [countries.length, setCountries, setIsLoading]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const selectedCountry = countries.find(
    (c) => phoneForm.watch('countryCode') === `${c.idd.root}${c.idd.suffixes[0]}`
  );

  const handlePhoneSubmit = (data: PhoneFormData) => {
    try {
      setPhoneData(data);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated OTP:', otp); // Debug log
      setSentOTP(otp);
      setStep('otp');
      toast.success(`OTP sent to ${data.countryCode}${data.phoneNumber}`);
      // Show OTP for testing (remove in final production)
      toast.success(`Simulated OTP: ${otp}`);
    } catch (error) {
      console.error('Error in handlePhoneSubmit:', error);
      toast.error('Failed to generate OTP');
    }
  };

  const handleOTPSubmit = (data: OTPFormData) => {
    try {
      if (data.otp === sentOTP && phoneData) {
        console.log('OTP verified, logging in:', phoneData); // Debug log
        login(phoneData.phoneNumber, phoneData.countryCode);
        toast.success('Login successful');
      } else {
        toast.error('Invalid OTP. Please try again.');
        otpForm.setError('otp', { message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error in handleOTPSubmit:', error);
      toast.error('Failed to verify OTP');
    }
  };

  const handleCountrySelect = (country: Country) => {
    const code = `${country.idd.root}${country.idd.suffixes[0]}`;
    phoneForm.setValue('countryCode', code);
    setShowCountryDropdown(false);
    setCountrySearch('');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Toaster position="top-right" /> {/* Ensure Toaster is included */}
      {step === 'phone' ? (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Gemini Chat
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your phone number to get started
            </p>
          </div>

          <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {selectedCountry ? (
                    <span className="flex items-center space-x-2">
                      <span>{selectedCountry.flag}</span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedCountry.name.common}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({phoneForm.watch('countryCode')})
                      </span>
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                      {isLoading ? 'Loading countries...' : 'Select a country'}
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {showCountryDropdown && !isLoading && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.cca2}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center space-x-2"
                        >
                          <span>{country.flag}</span>
                          <span className="text-gray-900 dark:text-white">
                            {country.name.common}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 ml-auto">
                            {country.idd.root}{country.idd.suffixes[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {phoneForm.formState.errors.countryCode && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {phoneForm.formState.errors.countryCode.message}
                </p>
              )}
            </div>

            <Input
              label="Phone Number"
              {...phoneForm.register('phoneNumber')}
              error={phoneForm.formState.errors.phoneNumber?.message}
              placeholder="Enter your phone number"
              type="tel"
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={phoneForm.formState.isSubmitting}
              disabled={isLoading}
            >
              Send OTP
            </Button>
          </form>

          {isLoading && (
            <div className="space-y-3">
              <LoadingSkeleton className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <LoadingSkeleton count={3} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Enter OTP
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent a 6-digit code to {phoneData?.countryCode}{phoneData?.phoneNumber}
            </p>
          </div>

          <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4">
            <Input
              label="6-Digit OTP"
              {...otpForm.register('otp')}
              error={otpForm.formState.errors.otp?.message}
              placeholder="000000"
              maxLength={6}
              className="text-center text-2xl tracking-widest"
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={otpForm.formState.isSubmitting}
            >
              Verify OTP
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep('phone')}
            >
              Back to Phone Number
            </Button>
          </form>
        </>
      )}
    </div>
  );
};