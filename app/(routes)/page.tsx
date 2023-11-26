import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/client-only";
import Container from "../components/container";
import EmptyState from "../components/empty-state";
import ListingCard from "../components/listing/card";
import { ISearchListingParams } from "../types";

interface IHomeProps {
  searchParams: ISearchListingParams;
}

export default async function Home({ searchParams }: IHomeProps) {
  const [listings, currentUser] = await Promise.all([
    getListings(searchParams),
    getCurrentUser(),
  ]);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              data={listing}
              key={listing.id}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
