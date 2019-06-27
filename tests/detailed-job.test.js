import { renderDetailedJob } from "../src/templates";
import { create as createJob } from "./job-builder";
import {
  getDetailedJobTitle,
  getDetailedJobFilterAttributes,
  getDetailedJobCoreAttributes,
  getDetailedJobCtaButton
} from "./page";

describe("Rendering the job detailed", () => {
  test("should render the title", () => {
    const job = createJob({ title: "test title" });

    const detailedJob = renderJob({ job });

    expect(getDetailedJobTitle(detailedJob)).toBe(job.title);
  });
  test("should render core attributes", () => {
    const job = createJob({
      company: "test company",
      location: "test location"
    });

    const detailedJob = renderJob({ job });

    const firstCoreAttributeText = getDetailedJobCoreAttributes(detailedJob)[0]
      .textContent;
    expect(firstCoreAttributeText.includes("Firma")).toBeTruthy();
    expect(firstCoreAttributeText.includes(job.company)).toBeTruthy();

    const secondCoreAttributeText = getDetailedJobCoreAttributes(detailedJob)[1]
      .textContent;
    expect(secondCoreAttributeText.includes("Ort")).toBeTruthy();
    expect(secondCoreAttributeText.includes(job.location)).toBeTruthy();
  });
  test("should render filter attributes", () => {
    const job = createJob({ testCategory: "test value" });
    const testCategory = { key: "testCategory", title: "Test Category" };

    const detailedJob = renderJob({ job, filterConfig: [testCategory] });

    expect(getDetailedJobFilterAttributes(detailedJob)[0].textContent).toBe(
      testCategory.title + " " + job.testCategory
    );
  });

  describe("when call-to-action is a link", () => {
    test("should render cta-button as link forwarding", () => {
      {
        const callToAction = {
          name: "Test CTA Link",
          link: "https://example.org/"
        };
        const job = createJob({ callToAction: callToAction });

        const detailedJob = renderJob({ job });

        const ctaButton = getDetailedJobCtaButton(detailedJob);
        expect(ctaButton.href).toBe(callToAction.link);
        expect(ctaButton.textContent).toBe(callToAction.name);
      }
    });
  });

  describe("when call-to-action is a mail address", () => {
    test("should render cta-button as mailto", () => {
      {
        const callToAction = {
          name: "Test CTA Mail Address",
          mail: "hello@test.org"
        };
        const job = createJob({ callToAction: callToAction });

        const detailedJob = renderJob({ job });

        const ctaButton = getDetailedJobCtaButton(detailedJob);
        expect(ctaButton.href).toBe("mailto:" + callToAction.mail);
        expect(ctaButton.textContent).toBe(callToAction.name);
      }
    });
  });

  describe("when no call-to-action is specified", () => {
    test("should render no cta-button", () => {
      const detailedJob = renderJob();

      expect(getDetailedJobCtaButton(detailedJob)).toBe(null);
    });
  });
});

function renderJob({ job, filterConfig, onGoBack } = {}) {
  job = job || createJob();
  filterConfig = filterConfig || [];
  onGoBack = onGoBack || jest.fn();

  return renderDetailedJob(job, filterConfig, onGoBack);
}
