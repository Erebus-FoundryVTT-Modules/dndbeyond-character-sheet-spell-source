Hooks.on("renderActorSheet", (actor, html) => {
  if (!html.hasClass("dndbcs")) {
    return;
  }

  const headers = html.find(".spellbook .inventory-header .spell-school");
  for (const header of headers) {
    const $sourceClass = $(`<div class="source-class">Source Class</div>`);
    header.after($sourceClass[0]);
  }

  const spells = html.find(
    ".spellbook .item:not('.inventory-header') .spell-school"
  );
  for (const spell of spells) {
    const id = spell.parentElement.outerHTML.match(/data-item-id="(.*?)"/);
    const item = actor.object.items.get(id[1]);
    const itemClass = item.data.flags["spellbook-assistant-manager"]?.class;
    const classItem =
      actor.object.classes[`${itemClass?.slugify({ strict: true })}`];
    const $sourceClass = $(`
          <div class="source-class">
              <div class="class-image" aria-label="${
                classItem?.name || ""
              }" style="background-image: url(${classItem?.img || ""});"></div>
          </div>
              `);
    spell.after($sourceClass[0]);
  }
});
