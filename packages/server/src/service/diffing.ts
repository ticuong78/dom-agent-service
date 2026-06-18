import {
  CheerioAdapter,
  HTMLToContextConverter,
  UUIDAdapter,
  SHA256HashAdapter,
  TreeHierarchyDiffViewer,
  NodeMutationDiffViewer,
  SubtreeShapeDiffViewer,
  CompositeDiffViewer,
  type StandardDiffType,
  DiffReport,
} from "@ticuong78/dom-agent";

export function diffingService(
  firstHTML: string,
  secondHTML: string,
): DiffReport {
  const cheerioAdapter = new CheerioAdapter();
  const converter = new HTMLToContextConverter(
    new UUIDAdapter(),
    new SHA256HashAdapter(),
  );
  const treeV1 = converter.convert(cheerioAdapter.parse(firstHTML)!);
  const treeV2 = converter.convert(cheerioAdapter.parse(secondHTML)!);

  if (!treeV1 || !treeV2) throw new Error("Roots are empty.");

  const hierarchyViewer = new TreeHierarchyDiffViewer();
  const mutationViewer = new NodeMutationDiffViewer();
  const shapeViewer = new SubtreeShapeDiffViewer();

  const composite = new CompositeDiffViewer<StandardDiffType>([
    hierarchyViewer,
    mutationViewer,
    shapeViewer,
  ]);

  const compositeDiffs = composite.highlight(treeV1, treeV2);

  const compositeReport = new DiffReport(compositeDiffs, "Composite Diff");

  return compositeReport;
}
