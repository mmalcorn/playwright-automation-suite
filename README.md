# playwright-automation-suite
Automated testing suite using Playwright

### Test Case 1
Login to Demo App.
Navigate to "Web Application."
Verify "Implement user authentication" is in the "To Do" column.
Confirm tags: "Feature" "High Priority”

### Test Case 2
Login to Demo App.
Navigate to "Web Application."
Verify "Fix navigation bug" is in the "To Do" column.
Confirm tags: "Bug"
Test Case 3
Login to Demo App.
Navigate to "Web Application."
Verify "Design system updates" is in the "In Progress" column.
Confirm tags: "Design”

### Test Case 4
Login to Demo App.
Navigate to "Mobile Application."
Verify "Push notification system" is in the "To Do" column.
Confirm tags: "Feature”

### Test Case 5
Login to Demo App.
Navigate to "Mobile Application."
Verify "Offline mode" is in the "In Progress" column.
Confirm tags: "Feature" & "High Priority”
Test Case 6
Login to Demo App.
Navigate to "Mobile Application."
Verify "App icon design" is in the "Done" column.
Confirm tags: "Design”



import { Page, Locator } from '@playwright/test';

function targetProjectName(page: Page, projectName: string): Locator {
  /**
   * Targets the interactable element (button) containing the specified project name.
   *
   * @param page The Playwright Page object.
   * @param projectName The name of the project ("Web Application", "Mobile Application", or "Marketing Campaign").
   * @returns A Playwright Locator object for the button containing the project name.
   */
  return page.locator('nav button', { hasText: projectName });
}

function getRootLevelProjectTitle(page: Page): Locator {
  /**
   * Targets the main project title ("Web Application") at the root level.
   *
   * @param page The Playwright Page object.
   * @returns A Playwright Locator object for the main project title.
   */
  return page.locator('header h1', { hasText: 'Web Application' });
}

function getRootLevelProjectDescription(page: Page): Locator {
  /**
   * Targets the main project description ("Main web application development") at the root level.
   *
   * @param page The Playwright Page object.
   * @returns A Playwright Locator object for the main project description.
   */
  return page.locator('header p', { hasText: 'Main web application development' });
}

function getColumnByName(page: Page, columnName: string): Locator {
  /**
   * Targets a column on the page based on its heading text ("To Do", "In Progress", "Review", "Done").
   *
   * @param page The Playwright Page object.
   * @param columnName The text content of the column heading.
   * @returns A Playwright Locator object for the column div.
   */
  return page.locator('div', { has: page.locator('h2', { hasText: columnName }) });
}

function getCardInColumn(columnLocator: Locator): Locator {
  /**
   * Targets a card element within a given column locator.
   *
   * @param columnLocator A Playwright Locator object for the column.
   * @returns A Playwright Locator object for a card within the column.
   */
  return columnLocator.locator('div.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200.hover\\:shadow-md.transition-shadow');
}

function getCardTitle(cardLocator: Locator): Locator {
  /**
   * Targets the title text within a card.
   *
   * @param cardLocator A Playwright Locator object for the card.
   * @returns A Playwright Locator object for the card's title (h3 element).
   */
  return cardLocator.locator('h3.font-medium.text-gray-900.mb-2');
}

function getCardDescription(cardLocator: Locator): Locator {
  /**
   * Targets the description text within a card.
   *
   * @param cardLocator A Playwright Locator object for the card.
   * @returns A Playwright Locator object for the card's description (p element).
   */
  return cardLocator.locator('p.text-sm.text-gray-600.mb-3');
}

function getCardTag(cardLocator: Locator, tagText: string): Locator {
  /**
   * Targets a specific tag within a card based on its text content.
   *
   * @param cardLocator A Playwright Locator object for the card.
   * @param tagText The text content of the tag to target (e.g., "Feature", "High Priority", "Bug").
   * @returns A Playwright Locator object for the span element containing the tag.
   */
  return cardLocator.locator('span', { hasText: tagText });
}

function getCardAuthor(cardLocator: Locator, authorName: string): Locator {
  /**
   * Targets the author name within a card based on its text content.
   *
   * @param cardLocator A Playwright Locator object for the card.
   * @param authorName The name of the author (e.g., "Sarah Chen", "John Smith").
   * @returns A Playwright Locator object for the span element containing the author's name.
   */
  return cardLocator.locator(`div.flex.items-center.gap-1:has-text("${authorName}") span`);
}

// Example usage (assuming you have a Page object named 'page'):
// To click on the "Mobile Application" project:
// const mobileAppButton = targetProjectName(page, "Mobile Application");
// await mobileAppButton.click();

// To get the root level project title:
// const projectTitle = await getRootLevelProjectTitle(page).innerText();
// console.log(projectTitle);

// To get the "To Do" column:
// const todoColumn = getColumnByName(page, "To Do");

// To get the first card in the "To Do" column:
// const firstTodoCard = todoColumn.locator(':nth-match(div.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200.hover\\:shadow-md.transition-shadow, 1)');

// To get the title of the first card in "To Do":
// const firstCardTitle = await getCardTitle(firstTodoCard).innerText();
// console.log(firstCardTitle);

// To check if a card has the "Bug" tag:
// const bugTagCount = await getCardTag(firstTodoCard, "Bug").count();
// if (bugTagCount > 0) {
//   console.log("Card has a 'Bug' tag");
// }

// To find a card with the author "John Smith" in the "To Do" column:
// const johnSmithCard = getCardInColumn(todoColumn).filter({ has: getCardAuthor(page.locator('div.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200.hover\\:shadow-md.transition-shadow'), "John Smith") }).first();
// if (await johnSmithCard.count() > 0) {
//   console.log("Found a card by John Smith in To Do");
// }










////////////////////////////////////////////////////// GEMINI UPDATED CODE THAT USES PRIVATE VARIABLES AND GETS THE VALUES FROM THE PAGE 

import { Page } from 'playwright'; // Or '@playwright/test' if using the test runner

export class KanbanBoardPageLocators {
  private page: Page;

  // Base CSS selector for the Kanban board area
  private readonly boardBaseCssSelector = "div.inline-flex.gap-6.p-6.h-full";
  // Common class for column containers
  private readonly columnContainerCssClass = "div.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4";
  // Common class for column headers (h2)
  private readonly columnHeaderCssClass = "h2.font-semibold.text-gray-700.mb-4.px-2";
  // Common class for card containers
  private readonly cardContainerCssClass = "div.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200";
  // Common class for card titles (h3)
  private readonly cardTitleCssClass = "h3.font-medium.text-gray-900.mb-2";
  // Common class for card descriptions (p)
  private readonly cardDescriptionCssClass = "p.text-sm.text-gray-600.mb-3";
  // Common class for tags container
  private readonly tagsContainerCssClass = "div.flex.flex-wrap.gap-2.mb-3";
  // Common class for the div holding author SVG and span
  private readonly authorBlockCssClass = "div.flex.items-center.gap-1";
  private readonly authorSvgCssClass = "svg.lucide.lucide-user";


  constructor(page: Page) {
    this.page = page;
  }

  // --- Selectors for elements NOT yet covered by provided HTML ---
  // --- These remain CONCEPTUAL and will need HTML for refinement ---
  // --- Using Playwright's getBy... or CSS selectors conceptually ---

  private readonly projectSelectorByNameCss = (projectName: string): string =>
    // CONCEPTUAL:
    // Using getByRole and filtering by name is often best for navigation items.
    // return `nav[aria-label="Projects"] >> role=link[name="${projectName}"i]`; // Example with role and text
    // Or if it's a button:
    // return `div[role="menu"] >> role=button[name="${projectName}"i]`;
    // Fallback to CSS if necessary:
    `css=nav[aria-label*="Project"] a:text-is("${projectName}")`; // Placeholder

  private readonly displayedProjectTitleCss = (projectTitle: string): string =>
    // CONCEPTUAL:
    // return `role=heading[name="${projectTitle}"i][level=1]`; // Preferred if it's a unique H1
    // Fallback to CSS:
    `css=h1:text-is("${projectTitle}"), div[data-testid="project-header-title"]:text-is("${projectTitle}")`; // Placeholder

  private readonly displayedProjectDescriptionCss = (projectDescription: string): string =>
    // CONCEPTUAL:
    // return `css=p:near(h1:text-is("PROJECT_TITLE_PLACEHOLDER")):text-matches("${projectDescription}")`; // Example, needs context
    `css=p:text-matches("${projectDescription}"), div[data-testid="project-header-description"]:text-matches("${projectDescription}")`; // Placeholder


  // --- Selectors refined based on the provided HTML using CSS & Playwright extensions ---

  /**
   * CSS Selector for a Kanban column container by its visible name.
   * Uses Playwright's :text-matches pseudo-class for partial text match on the h2.
   * @param columnName The visible name of the column (e.g., "To Do", "In Progress").
   */
  private readonly columnByNameCss = (columnName: string): string =>
    // Selects the column container that has an h2 header starting with the columnName.
    // The regex ^ ensures it matches from the beginning of the text.
    `${this.boardBaseCssSelector} > ${this.columnContainerCssClass}:has(${this.columnHeaderCssClass}:text-matches("^${columnName}"))`;

  /**
   * CSS Selector for a specific card within a named column by its title.
   * Uses Playwright's :text-is pseudo-class for exact text match on the h3.
   * @param cardTitle The visible title of the card.
   * @param columnName The name of the column the card is expected to be in.
   */
  private readonly cardInColumnByTitleCss = (cardTitle: string, columnName: string): string =>
    `${this.columnByNameCss(columnName)} ${this.cardContainerCssClass}:has(${this.cardTitleCssClass}:text-is("${cardTitle}"))`;

  /**
   * CSS Selector for ALL cards within a given column.
   * @param columnName The name of the column.
   */
  private readonly allCardsInColumnCss = (columnName: string): string =>
    `${this.columnByNameCss(columnName)} ${this.cardContainerCssClass}`;

  /**
   * CSS Selector for the title text element (h3) of a specific card.
   * @param cardTitle The title of the card to locate its content.
   * @param columnName The column the card is in.
   */
  private readonly cardTitleInCardCss = (cardTitle: string, columnName: string): string =>
    `${this.cardInColumnByTitleCss(cardTitle, columnName)} > ${this.cardTitleCssClass}`;

  /**
   * CSS Selector for the description text element (p) of a specific card.
   * @param cardTitle The title of the card.
   * @param columnName The column the card is in.
   */
  private readonly cardDescriptionInCardCss = (cardTitle: string, columnName: string): string =>
    `${this.cardInColumnByTitleCss(cardTitle, columnName)} > ${this.cardDescriptionCssClass}`;

  /**
   * CSS Selector for all tag <span> elements within a specific card.
   * @param cardTitle The title of the card.
   * @param columnName The column the card is in.
   */
  private readonly cardTagsByTitleCss = (cardTitle: string, columnName: string): string =>
    `${this.cardInColumnByTitleCss(cardTitle, columnName)} ${this.tagsContainerCssClass} > span`;

  /**
   * CSS Selector for a specific tag by its text within a card.
   * Uses Playwright's :text-is pseudo-class for exact text match.
   * @param cardTitle The title of the card.
   * @param columnName The column the card is in.
   * @param tagName The text of the tag.
   */
  private readonly specificTagInCardByTitleCss = (cardTitle: string, columnName: string, tagName: string): string =>
    `${this.cardTagsByTitleCss(cardTitle, columnName)}:text-is("${tagName}")`;

  /**
   * CSS Selector for the author name <span> element within a specific card.
   * Locates the div containing the user icon and then its child span.
   * @param cardTitle The title of the card.
   * @param columnName The column the card is in.
   */
  private readonly cardAuthorByTitleCss = (cardTitle: string, columnName: string): string =>
    `${this.cardInColumnByTitleCss(cardTitle, columnName)} ${this.authorBlockCssClass}:has(${this.authorSvgCssClass}) > span`;


  // --- Public methods to use these CSS selectors ---

  public async clickProject(projectName: string) {
    // TODO: Requires projectSelectorByNameCss to be refined with actual HTML structure
    await this.page.locator(this.projectSelectorByNameCss(projectName)).click();
  }

  public getDisplayedProjectTitleLocator(projectTitle: string) {
    // TODO: Requires displayedProjectTitleCss to be refined
    return this.page.locator(this.displayedProjectTitleCss(projectTitle));
  }

  public getDisplayedProjectDescriptionLocator(projectDescription: string) {
    // TODO: Requires displayedProjectDescriptionCss to be refined
    return this.page.locator(this.displayedProjectDescriptionCss(projectDescription));
  }

  public getColumnLocator(columnName: string) {
    return this.page.locator(this.columnByNameCss(columnName));
  }

  public getCardLocator(cardTitle: string, columnName: string) {
    return this.page.locator(this.cardInColumnByTitleCss(cardTitle, columnName));
  }

  public getCardTitleLocator(cardTitle: string, columnName: string) {
    return this.page.locator(this.cardTitleInCardCss(cardTitle, columnName));
  }

  public getCardDescriptionLocator(cardTitle: string, columnName: string) {
    return this.page.locator(this.cardDescriptionInCardCss(cardTitle, columnName));
  }

  public getCardTagsLocator(cardTitle: string, columnName: string) {
    return this.page.locator(this.cardTagsByTitleCss(cardTitle, columnName));
  }

  public getSpecificCardTagLocator(cardTitle: string, columnName: string, tagName: string) {
    return this.page.locator(this.specificTagInCardByTitleCss(cardTitle, columnName, tagName));
  }

  public getCardAuthorLocator(cardTitle: string, columnName: string) {
    return this.page.locator(this.cardAuthorByTitleCss(cardTitle, columnName));
  }

  public getAllCardsInColumnLocator(columnName: string) {
    return this.page.locator(this.allCardsInColumnCss(columnName));
  }
}