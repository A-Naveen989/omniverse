
/* =========================================
   OMNIVERSE - TV SERIES PAGE
   ========================================= */

import ContentListing from "../components/ContentListing";
import { getSeries } from "../data/adminStorage";

export default function Series() {
  const series = getSeries();

  return (
    <ContentListing
      titles={series}
      type="series"
      heading="TV Series"
      description="Explore gripping television series, complex characters, and stories that unfold across seasons."
    />
  );
}
