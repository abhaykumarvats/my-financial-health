import AddIncomeSourceComponent from "../components/add-income-source.component";
import IncomeSourcesListComponent from "../components/income-sources-list.component";
import PageComponent from "../components/page.component";

export default function () {
  return (
    <PageComponent title="Income Sources">
      <AddIncomeSourceComponent />
      <IncomeSourcesListComponent />
    </PageComponent>
  );
}
