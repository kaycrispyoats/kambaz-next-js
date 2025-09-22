import AssignmentEditor from "./AssignmentEditor";

export default function AssignmentEditPage({
  params,
}: {
  params: { cid: string; aid: string };
}) {
  return (
    <div>
      <h2>
         Assignment Name
      </h2>
      <AssignmentEditor />
    </div>
  );
}