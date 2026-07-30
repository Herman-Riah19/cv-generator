"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  checkAiConnection,
  AI_PROVIDERS,
  getProviderId,
  setProviderId,
  getAiBaseUrl,
  setAiBaseUrl,
  getAiApiKey,
  setAiApiKey,
  getAiModel,
  setAiModel,
} from "@/lib/ai";
import {
  Brain,
  Server,
  Check,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

export function AiConfig() {
  const [providerId, setProviderIdState] = useState(getProviderId());
  const [baseUrl, setBaseUrlState] = useState(getAiBaseUrl());
  const [apiKey, setApiKeyState] = useState(getAiApiKey());
  const [model, setModelState] = useState(getAiModel());
  const [showApiKey, setShowApiKey] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");

  const handleSaveAiConfig = () => {
    setProviderId(providerId);
    setAiBaseUrl(baseUrl);
    setAiApiKey(apiKey);
    setAiModel(model);
  };

  const handleTestConnection = async () => {
    handleSaveAiConfig();
    setConnectionStatus("testing");
    const ok = await checkAiConnection();
    setConnectionStatus(ok ? "success" : "error");
    setTimeout(() => setConnectionStatus("idle"), 3000);
  };

  const handleProviderChange = (id: string) => {
    setProviderIdState(id);
    const provider = AI_PROVIDERS.find((p) => p.id === id);
    if (provider && id !== "custom") {
      setBaseUrlState(provider.baseUrl);
      setModelState(provider.model);
      if (!apiKey) setApiKeyState(provider.apiKey);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5" />
        <span className="font-medium">Configuration IA</span>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Fournisseur
        </label>
        <select
          value={providerId}
          onChange={(e) => handleProviderChange(e.target.value)}
          className="w-full p-2 border rounded-md bg-background text-sm"
        >
          {AI_PROVIDERS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          URL de l&apos;API
        </label>
        <Input
          value={baseUrl}
          onChange={(e) => setBaseUrlState(e.target.value)}
          placeholder="https://api.openai.com/v1"
          className="text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Clé API
        </label>
        <div className="relative">
          <Input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="sk-..."
            className="text-sm pr-8"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Modèle
        </label>
        <Input
          value={model}
          onChange={(e) => setModelState(e.target.value)}
          placeholder="gpt-4o-mini"
          className="text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={handleSaveAiConfig}
        >
          <Server className="h-4 w-4 mr-1" />
          Sauvegarder
        </Button>
        <Button
          size="sm"
          variant={connectionStatus === "success" ? "default" : "outline"}
          className="flex-1"
          onClick={handleTestConnection}
          disabled={connectionStatus === "testing"}
        >
          {connectionStatus === "testing" ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : connectionStatus === "success" ? (
            <Check className="h-4 w-4 mr-1" />
          ) : connectionStatus === "error" ? (
            <span className="text-red-500">!</span>
          ) : (
            <Server className="h-4 w-4 mr-1" />
          )}
          {connectionStatus === "testing"
            ? "Test..."
            : connectionStatus === "success"
            ? "Connecté"
            : connectionStatus === "error"
            ? "Échec"
            : "Tester"}
        </Button>
      </div>
    </div>
  );
}
