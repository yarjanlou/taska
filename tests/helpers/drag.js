export async function dragAndDropDndKit(page, sourceLocator, targetLocator) {
  const source = await sourceLocator.boundingBox();
  const target = await targetLocator.boundingBox();

  if (!source || !target) {
    throw new Error("Source or target not visible");
  }

  await page.mouse.move(
    source.x + source.width / 2,
    source.y + source.height / 2,
  );

  await page.mouse.down();

  await page.mouse.move(
    target.x + target.width / 2,
    target.y + target.height / 2,
    { steps: 15 },
  );

  await page.mouse.up();
}
