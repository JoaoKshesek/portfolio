import { Codicon } from "@/components/atoms/codicon";
import { AiWorkflow } from "@/components/organisms/ai-workflow";
import { EditorBreadcrumbs } from "@/components/organisms/editor-breadcrumbs";
import { EditorTabs } from "@/components/organisms/editor-tabs";
import { EducationDetails } from "@/components/organisms/education-details";
import { ExperienceDetails } from "@/components/organisms/experience-details";
import { ReadmeProfile } from "@/components/organisms/readme-profile";
import { SitePreview } from "@/components/organisms/site-preview";
import { TechnologyDetails } from "@/components/organisms/technology-details";
import { useEditor } from "@/lib/editor";

export function Main() {
  const { activeTab } = useEditor();

  return (
    <main className="flex h-full min-w-0 flex-col overflow-hidden bg-ide-editor">
      <EditorTabs />

      {activeTab ? (
        <>
          <EditorBreadcrumbs tab={activeTab} />

          {activeTab.content.kind === "ai" ? (
            <AiWorkflow docId={activeTab.content.docId} />
          ) : activeTab.content.kind === "education" ? (
            <EducationDetails
              institutionId={activeTab.content.institutionId}
              studyId={activeTab.content.studyId}
            />
          ) : activeTab.content.kind === "experience" ? (
            <ExperienceDetails
              companyId={activeTab.content.companyId}
              roleId={activeTab.content.roleId}
            />
          ) : activeTab.content.kind === "profile" ? (
            <ReadmeProfile />
          ) : activeTab.content.kind === "technology" ? (
            <TechnologyDetails technology={activeTab.content.technology} />
          ) : activeTab.content.kind === "site" ? (
            <SitePreview
              url={activeTab.content.url}
              title={activeTab.content.title ?? activeTab.name}
            />
          ) : (
            <section className="min-h-0 flex-1 overflow-auto px-6 py-4 text-[13px] text-ide-muted">
              Conteúdo de {activeTab.name} entra aqui.
            </section>
          )}
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-ide-muted">
          <Codicon name="files" size={40} className="opacity-40" />
          <p className="text-[13px]">
            Selecione um arquivo no Explorer para abrir.
          </p>
        </div>
      )}
    </main>
  );
}
