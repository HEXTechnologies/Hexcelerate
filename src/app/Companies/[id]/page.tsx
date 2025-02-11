import { Suspense } from 'react';
import CompanyPageClient from './CompanyPageClient';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../firebaseConfig/firebase';
import ProfileSkeletons from '../../../components/CandidatesProfile/ProfileSkeletons';

export async function generateStaticParams() {
  try {
    const candidatesRef = collection(firestore, "Companies");
    const snapshot = await getDocs(candidatesRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // Return empty array if there's an error
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Candidate Profile - ${params.id}`,
    description: "Candidate profile page",
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProfileSkeletons isLightMode={false} />}>
      <CompanyPageClient params={params} />
    </Suspense>
  );
}