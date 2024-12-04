import AddSource from "../components/add-source";
import Page from "../components/page";
import SourcesList from "../components/sources-list";

export default function SourcesPage() {
  return (
    <Page title="Income Sources">
      <AddSource />
      <SourcesList />
    </Page>
  );
}
