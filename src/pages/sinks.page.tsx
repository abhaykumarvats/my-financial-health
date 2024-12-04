import AddExpenseSinkComponent from "../components/add-expense-sink.component";
import PageComponent from "../components/page.component";

export default function () {
  return (
    <PageComponent title="Expense Sinks">
      <AddExpenseSinkComponent />
    </PageComponent>
  );
}
